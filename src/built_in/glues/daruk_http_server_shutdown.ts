/**
 * @fileOverview 优雅关机插件
 */

import { Daruk } from '../../typings/daruk';

import { ShutDown } from 'http-server-shutdown';

export default function(app: Daruk.DarukCore) {
  return function httpServerShutdown() {
    const serverShutDown = new ShutDown(app.httpServer, { monitor: false });
    const timeout = app.options.gracefulShutdown.timeout;
    app.exitHook.addHook(function handleHttpGracefulShutdown(err: Error, cb: Function) {
      app.logger.info(`handle unfinished connections, waiting up to ${timeout}ms`);
      const startTime = Date.now();
      serverShutDown
        .serverClose()
        .then(() => {
          app.logger.info(`closed all connections and took ${Date.now() - startTime}ms`);
          cb();
        })
        .catch((err: Error) => {
          app.logger.error('server shutdown: ' + err.message);
          cb();
        });
      // 避免连接关闭超时
      setTimeout(cb, timeout);
    });
  };
}
