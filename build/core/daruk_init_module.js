"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const cron_1 = require("cron");
const is = require("is");
const path = require("path");
require("reflect-metadata");
const constants_1 = require("../decorators/constants");
const utils_1 = require("../utils");
const daruk_event_1 = require("./daruk_event");
const daruk_loader_1 = require("./daruk_loader");
const join = path.join;
const noop = function noop() { };
const isFn = is.fn;
class DarukInitModule {
    initEnv() {
        const { options } = this;
        const loader = new daruk_loader_1.default(this);
        loader.loadConfig(options.configPath);
        daruk_event_1.default.emit('configLoaded', this);
        this.initConfig();
        loader.loadDarukConfig(options.darukConfigPath);
        daruk_event_1.default.emit('darukConfigLoaded', this);
        this.initGlobalModule();
        loader.loadUtil(options.utilPath);
        daruk_event_1.default.emit('utilLoaded', this);
        this.initUtil();
        loader.loadGlue(options.gluePath);
        loader.loadGlue(join(__dirname, '../built_in/glues'));
        daruk_event_1.default.emit('glueLoaded', this);
        this.initGlue();
        loader.loadService(options.servicePath);
        this.emit('serviceLoaded', this);
        loader.loadMiddleware(options.middlewarePath);
        loader.loadMiddleware(join(__dirname, '../built_in/middlewares'));
        daruk_event_1.default.emit('middlewareLoaded', this);
        this.initMiddleware();
        loader.loadController(options.controllerPath);
        daruk_event_1.default.emit('controllerLoaded', this);
        this.initRouter();
        loader.loadTimer(options.timerPath);
        daruk_event_1.default.emit('timerLoaded', this);
        this.initTimer();
    }
    initConfig() {
        this.config = this.context.config = this.module.config;
        this.prettyLog('', { type: 'config', init: true });
    }
    initGlobalModule() {
        this.globalModule = this.context.globalModule = this.module.globalModule;
        this.logModuleMsg('globalModule', this.globalModule);
    }
    initUtil() {
        this.util = this.context.util = this.module.util;
        this.logModuleMsg('util', this.util);
    }
    initGlue() {
        this.glue = this.context.glue = this.module.glue;
        this.logModuleMsg('glue', this.glue);
    }
    initMiddleware() {
        const middlewareOrder = this.module.middlewareOrder || [];
        if (this.options.monitor.enable) {
            middlewareOrder.unshift('daruk_monitor');
        }
        middlewareOrder.unshift('daruk_request_id', 'daruk_logger', 'daruk_context_loader');
        this.module.middlewareOrder = middlewareOrder;
        const self = this;
        middlewareOrder.forEach(function useMiddleware(name) {
            const middleware = self.module.middleware[name];
            assert(is.undefined(middleware) === false, `[middleware] ${name} is not found`);
            if (isFn(middleware)) {
                self.use(middleware, name);
            }
        });
        this.prettyLog(JSON.stringify(utils_1.filterBuiltInModule('middleware', middlewareOrder)), {
            type: 'middleware',
            init: true
        });
    }
    logModuleMsg(type, moduleObj) {
        if (!moduleObj)
            return;
        const keys = utils_1.filterBuiltInModule(type, Object.keys(moduleObj));
        if (keys.length > 0) {
            this.prettyLog(JSON.stringify(keys), { type, init: true });
        }
    }
    initRouter() {
        const controllers = this.module.controller;
        const routeMap = {};
        const self = this;
        Object.keys(controllers).forEach(function handleControllers(prefixPath) {
            const ControllerClass = controllers[prefixPath];
            const routeFuncs = Reflect.getMetadata(constants_1.CONTROLLER_FUNC_NAME, ControllerClass) || [];
            routeFuncs.forEach(function defineRoute(funcName) {
                const { method, path } = Reflect.getMetadata(constants_1.CONTROLLER_PATH, ControllerClass, funcName);
                const routePath = join('/', prefixPath, path, '/');
                routeMap[method] = routeMap[method] || [];
                assert(routeMap[method].indexOf(routePath) === -1, `[router] duplicate routing definition in ${ControllerClass.name}.${funcName}: ${routePath}`);
                routeMap[method].push(routePath);
                const middlewareNames = Reflect.getMetadata(constants_1.MIDDLEWARE_NAME, ControllerClass, funcName);
                if (middlewareNames) {
                    middlewareNames.forEach(name => {
                        const middleware = self.module.middleware[name];
                        assert(isFn(middleware), `[middleware] ${name} is not found or not a function`);
                        self.router.use(routePath, middleware);
                    });
                }
                self.prettyLog(`${method} - ${routePath}`, { type: 'router', init: true });
                self.router[method](routePath, async function routeHandle(ctx, next) {
                    let controllerInstance = new ControllerClass(ctx);
                    await controllerInstance[funcName](ctx, next);
                    if (isFn(controllerInstance._destroy)) {
                        controllerInstance._destroy();
                    }
                    controllerInstance = null;
                });
            });
        });
        this.use(this.router.routes(), 'router');
        this.use(this.router.allowedMethods(), 'allowedMethods');
    }
    initTimer() {
        let timer = this.module.timer || {};
        const defaultJob = {
            onComplete: noop,
            start: noop,
            timeZone: 'Asia/Shanghai',
            runOninit: false
        };
        Object.keys(timer).forEach(function initTimer(jobName) {
            let job = timer[jobName];
            job = Object.assign({}, defaultJob, job);
            job.export = new cron_1.CronJob(job.cronTime, job.onTick, job.onComplete, job.start, job.timezone, job.export, job.runOninit);
        });
    }
}
exports.default = DarukInitModule;
//# sourceMappingURL=daruk_init_module.js.map