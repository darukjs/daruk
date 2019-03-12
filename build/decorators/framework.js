"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const help_decorator_class_1 = require("./help_decorator_class");
function createDecorator(moduleName) {
    return function frameworkDecorator(field) {
        return (proto, propertyKey) => {
            Object.defineProperty(proto, propertyKey, {
                get: () => {
                    let res = help_decorator_class_1.default.getModule(moduleName);
                    assert(res !== undefined, `[Decorator @${moduleName}] cannot find module '${moduleName}' to inject`);
                    if (field !== undefined) {
                        res = res[field];
                        assert(res !== undefined, `[Decorator @${moduleName}] '${moduleName}.${field}' does not exist`);
                    }
                    return res;
                }
            });
        };
    };
}
function loggerDecorator(fileInfo) {
    return (proto, propertyKey) => {
        const logger = help_decorator_class_1.default.getModule('logger');
        if (fileInfo === undefined) {
            proto[propertyKey] = logger;
        }
        else {
            proto[propertyKey] = logger.customFileInfo(fileInfo);
        }
    };
}
exports.config = createDecorator('config');
exports.util = createDecorator('util');
exports.glue = createDecorator('glue');
exports.logger = loggerDecorator;
//# sourceMappingURL=framework.js.map