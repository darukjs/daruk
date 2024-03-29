/**
 * @fileOverview 进程退出插件
 */

import ExitHook = require('daruk-exit-hook');
import { injectable } from 'inversify';
import Daruk from '../core/daruk';
import { darukContainer } from '../core/inversify.config';
import { plugin } from '../decorators';
import { PluginClass } from '../typings/daruk';

@plugin()
class DarukExitHook implements PluginClass {
  public async initPlugin(daruk: Daruk) {
    if (daruk.options.exitHook) {
      let exitHook = new ExitHook({
        onExit: (err: Error | null) => {
          if (err) {
            daruk.prettyLog(err.stack || err.message, { level: 'error' });
          }
          daruk.prettyLog('process is exiting');
          daruk.emit('exit', err, daruk);
        },
        onExitDone: (code: number) => {
          daruk.prettyLog(`process exited: ${code}`);
        }
      });
      return exitHook;
    }
  }
}
