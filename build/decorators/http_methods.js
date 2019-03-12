"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const is = require("is");
require("reflect-metadata");
const constants_1 = require("./constants");
function createMethodDecorator(method) {
    return function httpMethodDecorator(path) {
        assert(is.string(path), `[Decorator @${method}] parameter must be a string`);
        return (proto, propertyKey, descriptor) => {
            const target = proto.constructor;
            const funcs = Reflect.getMetadata(constants_1.CONTROLLER_FUNC_NAME, target) || [];
            funcs.push(propertyKey);
            Reflect.defineMetadata(constants_1.CONTROLLER_FUNC_NAME, funcs, target);
            const routerMeta = {
                method,
                path
            };
            Reflect.defineMetadata(constants_1.CONTROLLER_PATH, routerMeta, target, propertyKey);
        };
    };
}
exports.post = createMethodDecorator('post');
exports.get = createMethodDecorator('get');
exports.del = createMethodDecorator('del');
exports.put = createMethodDecorator('put');
exports.patch = createMethodDecorator('patch');
exports.options = createMethodDecorator('options');
exports.head = createMethodDecorator('head');
exports.all = createMethodDecorator('all');
//# sourceMappingURL=http_methods.js.map