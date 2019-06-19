/**
 * @fileOverview 优雅关机插件
 */

import ExitHook = require('daruk-exit-hook');
import ShutDown = require('http-server-shutdown');

import plugins from '../core/plugin';
import { DarukCore } from '../typings/daruk';

plugins.add('darukHttpServerShutdown', (daruk: DarukCore) => {
  daruk.on('ready', () => {
    if (daruk.options.gracefulShutdown.enable) {
      const serverShutDown = new ShutDown(daruk.httpServer, { monitor: false });
      const timeout = daruk.options.gracefulShutdown.timeout;
      (daruk.exitHook as ExitHook).addHook(function handleHttpGracefulShutdown(
        err: Error,
        cb: Function
      ) {
        daruk.logger.info(`handle unfinished connections, waiting up to ${timeout}ms`);
        const startTime = Date.now();
        serverShutDown
          .serverClose()
          .then(() => {
            daruk.logger.info(`closed all connections and took ${Date.now() - startTime}ms`);
            cb();
          })
          .catch((err: Error) => {
            daruk.logger.error('server shutdown: ' + err.message);
            cb();
          });
        // 避免连接关闭超时
        setTimeout(cb, timeout);
      });
    }
  });
});
