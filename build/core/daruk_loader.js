"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const fs = require("fs");
const is = require("is");
const path = require("path");
const utils_1 = require("../utils");
const base_context_1 = require("./base_context");
const join = path.join;
const isFn = is.fn;
class DarukLoader {
    constructor(app) {
        this.app = app;
    }
    loadConfig(path) {
        this.loadModuleSimple('config', path);
    }
    loadDarukConfig(path) {
        if (!fs.existsSync(path + '.js') && !fs.existsSync(path + '.ts'))
            return;
        const mod = utils_1.uRequire(path);
        assert(isFn(mod), `DarukConfig must export a function, ${path}`);
        const DarukConfig = mod(this.app);
        const validConfigKey = ['util', 'timer', 'middleware', 'middlewareOrder', 'globalModule'];
        validConfigKey.forEach((key) => {
            if (!DarukConfig[key])
                return;
            if (key === 'middleware') {
                this.loadDarukConfigMid(DarukConfig[key]);
                return;
            }
            if (key === 'middlewareOrder') {
                this.app.setArrayModule('middlewareOrder', DarukConfig[key]);
                return;
            }
            this.app.mergeModule(key, DarukConfig[key]);
        });
    }
    loadUtil(path) {
        this.loadModuleSimple('util', path);
    }
    loadTimer(path) {
        const timer = this.loadModule('timer', path);
        this.app.mergeModule('timer', timer);
    }
    loadGlue(path) {
        const glue = this.loadModule('glue', path);
        this.app.mergeModule('glue', glue);
    }
    loadService(path) {
        const service = this.loadClassModule('service', path, true);
        this.app.mergeModule('service', service);
    }
    loadController(path) {
        const routePath2ControllerMap = {};
        let routers = this.getFilePathRecursive(path);
        routers.forEach((file) => {
            let controller = utils_1.uRequire(file);
            assert(utils_1.isSubClass(controller, base_context_1.default), `[controller must export a subclass of Daruk.BaseController in path: ${file}`);
            let RoutePath = file.replace(path, '').replace(utils_1.JsTsReg, '');
            const validClassName = RoutePath
                .replace(/(^[a-z])/, (matches, capture) => {
                return capture.toLocaleUpperCase();
            })
                .replace(/\/([a-z])/g, (matches, capture) => {
                return capture.toLocaleUpperCase();
            })
                .replace(/\//g, '');
            assert(validClassName === controller.name, `controller class name should be '${validClassName}' ( CamelCase style and match route path ) in path: ${file}`);
            RoutePath = RoutePath.replace(/\/index$/g, '/');
            routePath2ControllerMap[RoutePath] = controller;
        });
        this.app.mergeModule('controller', routePath2ControllerMap);
    }
    loadMiddleware(path) {
        const middleware = this.loadModule('middleware', path);
        this.app.mergeModule('middleware', middleware);
    }
    loadDarukConfigMid(midConfig) {
        const middleware = {};
        Object.keys(midConfig).forEach((key) => {
            const config = midConfig[key];
            let midName = key;
            let midExport;
            let packetName;
            if (is.object(config)) {
                packetName = config.packet;
                midExport = config.export;
            }
            else {
                packetName = key;
                midExport = config;
            }
            let packet;
            try {
                packet = require(packetName);
            }
            catch (e) {
                throw new Error(`[daruk.config.middleware] require ${packetName} failed -  ${e.message}`);
            }
            assert(isFn(midExport), `[daruk.config.middleware] ${key} must be (or export) a function`);
            middleware[midName] = midExport(packet);
        });
        this.app.mergeModule('middleware', middleware);
    }
    loadModuleSimple(type, path) {
        if (!fs.existsSync(path))
            return;
        const mod = utils_1.uRequire(path);
        assert(isFn(mod), `${type} must export a function in path: ${path}`);
        this.app.mergeModule(type, mod(this.app));
    }
    getModuleDesc(modulePath) {
        const descriptions = [];
        if (fs.existsSync(modulePath)) {
            const files = fs.readdirSync(modulePath);
            files.forEach((val) => {
                const fullPath = join(modulePath, val);
                const isFile = fs.lstatSync(fullPath).isFile();
                if ((isFile && utils_1.isJsTsFile(fullPath)) || !isFile) {
                    descriptions.push({
                        name: isFile ? val.replace(utils_1.JsTsReg, '') : val,
                        path: fullPath
                    });
                }
            });
        }
        return descriptions;
    }
    loadModule(type, path) {
        const descriptions = this.getModuleDesc(path);
        const modules = {};
        descriptions.forEach((desc) => {
            const { name, path } = desc;
            const mod = utils_1.uRequire(path);
            assert(isFn(mod), `[${type}] must export a function in path in path: ${path}`);
            if (name === 'index') {
                mod(this.app);
            }
            else {
                modules[name] = mod(this.app);
            }
        });
        return modules;
    }
    loadClassModule(key, path, autoExecuteIndex) {
        const descriptions = this.getModuleDesc(path);
        const modules = {};
        descriptions.forEach((desc) => {
            const { name, path } = desc;
            const classModule = utils_1.uRequire(path);
            if (name === 'index' && autoExecuteIndex) {
                assert(isFn(classModule), `[${key}] must export a function, ${path}`);
                classModule(this.app);
            }
            else {
                assert(utils_1.isSubClass(classModule, base_context_1.default), `[${key}] must export a subclass of Daruk.Base${key.charAt(0).toUpperCase() +
                    key.slice(1)} in path: ${path}`);
                modules[name] = classModule;
            }
        });
        return modules;
    }
    getFilePathRecursive(startPath) {
        let result = [];
        if (fs.existsSync(startPath)) {
            finder(startPath);
        }
        function finder(path) {
            let files = fs.readdirSync(path);
            files.forEach((val) => {
                let fPath = join(path, val);
                let stats = fs.statSync(fPath);
                if (stats.isDirectory())
                    finder(fPath);
                if (stats.isFile() && utils_1.isJsTsFile(val))
                    result.push(fPath);
            });
        }
        return result;
    }
}
exports.default = DarukLoader;
//# sourceMappingURL=daruk_loader.js.map