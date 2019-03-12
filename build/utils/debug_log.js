"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const warnR = 225;
const warnG = 250;
const warnB = 120;
const errorR = 238;
const errorG = 119;
const errorB = 109;
const logR = 38;
const logG = 209;
const logB = 237;
function debugLog(msg, type = 'info') {
    switch (type) {
        case 'warn':
            console.log(chalk_1.default.rgb(warnR, warnG, warnB)(msg));
            break;
        case 'error':
            console.log(chalk_1.default.rgb(errorR, errorG, errorB)(msg));
            break;
        default:
            console.log(chalk_1.default.rgb(logR, logG, logB)(msg));
            break;
    }
}
exports.debugLog = debugLog;
//# sourceMappingURL=debug_log.js.map