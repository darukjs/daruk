"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const is_js_ts_1 = require("./is_js_ts");
function getBuiltInModuleNames(path) {
    return fs
        .readdirSync(path)
        .filter((file) => is_js_ts_1.isJsTsFile(file))
        .map((file) => file.replace(is_js_ts_1.JsTsReg, ''));
}
const builtInModuleMap = {
    middleware: getBuiltInModuleNames(path.join(__dirname, '../built_in/middlewares')),
    glue: getBuiltInModuleNames(path.join(__dirname, '../built_in/glues'))
};
function filterBuiltInModule(type, moduleKeys) {
    if (!builtInModuleMap[type])
        return moduleKeys;
    return moduleKeys.filter((key) => {
        return builtInModuleMap[type].indexOf(key) === -1;
    });
}
exports.filterBuiltInModule = filterBuiltInModule;
//# sourceMappingURL=filter_built_in_module.js.map