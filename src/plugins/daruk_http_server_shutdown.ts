/**
 * @fileOverview 优雅关机插件
 */

import ExitHook = require('daruk-exit-hook');
import ShutDown = require('http-server-shutdown');

import Daruk from '../core/daruk';
import plugins from '../core/plugin';

interface DarukExitHook extends Daruk {
  exitHook: ExitHook;
}

plugins.add('darukHttpServerShutdown', ['darukExitHook'], (daruk: DarukExitHook) => {
  const serverShutDown = new ShutDown(daruk.httpServer, { monitor: false });
  const timeout = daruk.options.gracefulShutdown.timeout;
  daruk.exitHook.addHook(function handleHttpGracefulShutdown(err: Error, cb: Function) {
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
});
