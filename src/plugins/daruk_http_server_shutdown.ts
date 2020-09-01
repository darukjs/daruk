/**
 * @fileOverview 优雅关机插件
 */

import ExitHook = require('daruk-exit-hook');
import ShutDown = require('http-server-shutdown');
import { injectable } from 'inversify';
import Daruk from '../core/daruk';
import { darukContainer } from '../core/inversify.config';
import { TYPES } from '../core/types';
import { plugin } from '../decorators';
import { PluginClass } from '../typings/daruk';

@plugin()
@injectable()
class DarukHttpShutdown implements PluginClass {
  public async initPlugin(daruk: Daruk) {
    daruk.on('serverReady', () => {
      if (daruk.options.gracefulShutdown.enable) {
        const serverShutDown = new ShutDown(daruk.httpServer, { monitor: false });
        const timeout = daruk.options.gracefulShutdown.timeout;
        const DarukExitHook = darukContainer.getNamed<ExitHook>(
          TYPES.PluginInstance,
          'DarukExitHook'
        );
        DarukExitHook.addHook(function handleHttpGracefulShutdown(err: Error | null, cb: Function) {
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
  }
}
