"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const daruk_logger_1 = require("daruk-logger");
function default_1(app) {
    const { filter, requiredLogs } = app.options.loggerMiddleware;
    const options = {
        transform(logObj, ctx) {
            ctx.access_log = logObj;
        }
    };
    if (filter)
        options.filter = filter;
    if (requiredLogs)
        options.requiredLogs = requiredLogs;
    return daruk_logger_1.middleware(options);
}
exports.default = default_1;
//# sourceMappingURL=daruk_logger.js.map