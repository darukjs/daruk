"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ShutDown = require("http-server-shutdown");
function default_1(app) {
    return function httpServerShutdown() {
        const serverShutDown = new ShutDown(app.httpServer, { monitor: false });
        const timeout = app.options.gracefulShutdown.timeout;
        app.exitHook.addHook(function handleHttpGracefulShutdown(err, cb) {
            app.logger.info(`handle unfinished connections, waiting up to ${timeout}ms`);
            const startTime = Date.now();
            serverShutDown
                .serverClose()
                .then(() => {
                app.logger.info(`closed all connections and took ${Date.now() - startTime}ms`);
                cb();
            })
                .catch((err) => {
                app.logger.error('server shutdown: ' + err.message);
                cb();
            });
            setTimeout(cb, timeout);
        });
    };
}
exports.default = default_1;
//# sourceMappingURL=daruk_http_server_shutdown.js.map