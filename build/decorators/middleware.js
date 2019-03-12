"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const is = require("is");
require("reflect-metadata");
const constants_1 = require("./constants");
function middleware(middlewareName) {
    assert(is.string(middlewareName), `[Decorator @middleware] parameter must be a string`);
    return (target, propertyKey, descriptor) => {
        Reflect.defineMetadata(constants_1.MIDDLEWARE_NAME, middlewareName, target.constructor, propertyKey);
    };
}
exports.middleware = middleware;
//# sourceMappingURL=middleware.js.map