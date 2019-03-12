"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const is = require("is");
class HelpContextClass {
    constructor(ctx) {
        const services = ctx.app.module.service;
        this._ctx = ctx;
        this._serviceCache = {};
        const self = this;
        Object.keys(services).forEach(function definePropertyForServices(serviceName) {
            Object.defineProperty(self, serviceName, {
                get() {
                    if (self._serviceCache[serviceName])
                        return self._serviceCache[serviceName];
                    const serviceInstance = new services[serviceName](self._ctx);
                    self._serviceCache[serviceName] = serviceInstance;
                    return serviceInstance;
                }
            });
        });
    }
    _destroy() {
        const serviceCache = this._serviceCache;
        Object.keys(serviceCache).forEach(function destroyServiceCache(serviceName) {
            const serviceInstance = serviceCache[serviceName];
            if (is.fn(serviceInstance._destroy)) {
                serviceInstance._destroy();
            }
        });
        this._serviceCache = null;
        this._ctx = null;
    }
}
exports.default = HelpContextClass;
//# sourceMappingURL=help_context_class.js.map