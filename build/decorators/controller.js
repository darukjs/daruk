"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const is = require("is");
require("reflect-metadata");
const constants_1 = require("./constants");
function controller(prefixPath) {
    assert(is.string(prefixPath), '[Decorator @controller] parameter must be a string');
    return (target) => {
        Reflect.defineMetadata(constants_1.CONTROLLER_PREFIX_PATH, prefixPath, target);
    };
}
exports.default = controller;
//# sourceMappingURL=controller.js.map