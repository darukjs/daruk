"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const monitor_1 = require("../libs/monitor");
const auth = require("basic-auth");
function default_1(app) {
    let monitor;
    return async function DarukMonitor(ctx, next) {
        if (ctx.request && /^\/monitor\//.test(ctx.request.url)) {
            const authRes = doAuth(ctx, app.options.monitor.auth);
            if (authRes) {
                if (!monitor)
                    monitor = getMonitor();
                let result = monitor.getAnalytics(ctx);
                if (result) {
                    ctx.body = await result;
                }
            }
        }
        await next();
    };
    function getMonitor() {
        const { v8AnalyticsPath, v8ProfilerPath } = app.options.monitor;
        return new monitor_1.default({
            v8AnalyticsPath,
            v8ProfilerPath
        });
    }
}
exports.default = default_1;
function doAuth(ctx, authOptions) {
    const credentials = auth(ctx.req);
    const { name, password } = authOptions;
    const errorCode = 401;
    if (credentials && name === credentials.name && password === credentials.pass)
        return true;
    ctx.status = errorCode;
    ctx.set('WWW-Authenticate', 'Basic realm="daruk"');
    ctx.body = 'Access denied';
    return false;
}
//# sourceMappingURL=daruk_monitor.js.map