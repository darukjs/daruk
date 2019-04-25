"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const ExitHook = require("daruk-exit-hook");
const KoaLogger = require("daruk-logger");
const is = require("is");
const Koa = require("koa");
const Router = require("koa-router");
const deepAssign = require("object-assign-deep");
const path = require("path");
const help_decorator_class_1 = require("../decorators/help_decorator_class");
const http_server_1 = require("../mock/http_server");
const utils_1 = require("../utils");
const daruk_default_options_1 = require("./daruk_default_options");
const daruk_event_1 = require("./daruk_event");
const daruk_init_module_1 = require("./daruk_init_module");
const help_context_class_1 = require("./help_context_class");
const wrap_middleware_use_1 = require("./wrap_middleware_use");
let DarukCore = class DarukCore extends Koa {
    constructor(name, options) {
        super();
        this.name = name;
        this.context.app = this;
        const rootPath = options.rootPath || path.dirname(require.main.filename);
        const defaultOptions = daruk_default_options_1.default(rootPath, name, options.debug || false);
        const customLogger = options.customLogger;
        delete options.customLogger;
        this.options = deepAssign({}, defaultOptions, options);
        this.options.customLogger = options.customLogger = customLogger;
        this.logger = customLogger || new KoaLogger.logger(this.options.loggerOptions);
        help_decorator_class_1.default.init(this);
        this.module = {};
        this.initExitHook();
        wrap_middleware_use_1.default(this);
        const self = this;
        daruk_event_1.default.on('access', function handleAccessLog(ctx) {
            const { access_log, middleware_perf } = ctx;
            middleware_perf.request_id = ctx.id;
            access_log.msg = JSON.stringify(ctx.middleware_perf);
            self.logger.access(access_log, ctx);
        });
        this.on('error', function handleKoaError(err) {
            self.prettyLog('[koa error] ' + (err.stack || err.message), { level: 'error' });
        });
        this.router = new Router();
        this.initEnv();
    }
    prettyLog(msg, ext) {
        const { type, level, init } = Object.assign({ type: '', level: 'info', init: false }, ext);
        const prefixInfo = [init ? '[init] ' : '', type ? `[${type}] ` : ' '].join('');
        if (this.options.debug) {
            utils_1.debugLog(`[${new Date().toLocaleString()}] [debug] ${prefixInfo}${msg}`, level);
        }
        else {
            this.logger[level](prefixInfo + msg);
        }
    }
    mergeModule(type, mergeObj) {
        if (!this.module[type])
            this.module[type] = {};
        this.module[type] = Object.assign({}, this.module[type], mergeObj);
    }
    setModule(type, key, value) {
        if (!this.module[type])
            this.module[type] = {};
        this.module[type][key] = value;
    }
    setArrayModule(type, arr) {
        this.module[type] = arr;
    }
    register(type, descriptions) {
        const descs = Array.isArray(descriptions) ? descriptions : [descriptions];
        descs.forEach((desc) => {
            this.setModule(type, desc.name, desc.export);
        });
    }
    registerService(des) {
        this.register('service', des);
    }
    registerGlue(des) {
        this.register('glue', des);
    }
    registerMiddleware(des) {
        this.register('middleware', des);
    }
    registerTimer(des) {
        this.register('timer', des);
    }
    registerUtil(des) {
        this.register('util', des);
    }
    mockContext(req) {
        const { request, response } = http_server_1.default(req);
        const ctx = this.createContext(request, response);
        ctx.service = new help_context_class_1.default(ctx);
        return ctx;
    }
    run(port, host, cb) {
        let _cb = cb;
        let _host = host;
        if (is.fn(host)) {
            _cb = host;
            _host = undefined;
        }
        const httpServer = this.listen(port, _host, () => {
            this.serverReady(httpServer);
            if (_cb)
                _cb();
            this.prettyLog(`${this.name} is starting at http://${_host ? _host : 'localhost'}:${port}`);
        });
        this.httpServer = httpServer;
        return httpServer;
    }
    serverReady(server) {
        this.httpServer = server;
        this.initAfter();
        this.emit('ready', this);
    }
    initAfter() {
        if (this.options.gracefulShutdown.enable) {
            this.glue.daruk_http_server_shutdown();
        }
    }
    initExitHook() {
        this.exitHook = new ExitHook({
            onExit: (err) => {
                if (err) {
                    this.prettyLog(err.stack || err.message, { level: 'error' });
                }
                this.prettyLog('process is exiting');
                daruk_event_1.default.emit('exit', err, this);
            },
            onExitDone: (code) => {
                this.prettyLog(`process exited: ${code}`);
            }
        });
    }
};
DarukCore = __decorate([
    utils_1.SimpleMixin(daruk_init_module_1.default),
    __metadata("design:paramtypes", [String, Object])
], DarukCore);
exports.default = DarukCore;
//# sourceMappingURL=daruk_core.js.map