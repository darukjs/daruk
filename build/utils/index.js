"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
function SimpleMixin(BaseClass) {
    return (DerivedClass) => {
        Object.getOwnPropertyNames(BaseClass.prototype).forEach((name) => {
            if (name !== 'constructor') {
                DerivedClass.prototype[name] = BaseClass.prototype[name];
            }
        });
    };
}
exports.SimpleMixin = SimpleMixin;
function uRequire(path) {
    const module = require(path);
    return module.__esModule && module.default ? module.default : module;
}
exports.uRequire = uRequire;
function isSubClass(subClass, superClass) {
    return superClass.isPrototypeOf(subClass);
}
exports.isSubClass = isSubClass;
__export(require("./debug_log"));
__export(require("./filter_built_in_module"));
__export(require("./is_js_ts"));
//# sourceMappingURL=index.js.map