"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsTsReg = /\.js$|\.ts$/;
function isJsTsFile(filename) {
    return exports.JsTsReg.test(filename);
}
exports.isJsTsFile = isJsTsFile;
//# sourceMappingURL=is_js_ts.js.map