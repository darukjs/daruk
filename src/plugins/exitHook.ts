/**
 * @fileOverview 进程退出插件
 */

import ExitHook = require('daruk-exit-hook');
import { injectable } from 'inversify';
import Daruk from '../core/daruk';
import { plugin } from '../decorators';
import { pluginClass } from '../typings/daruk';

@plugin()
@injectable()
class DarukExitHook implements pluginClass {
  public async initPlugin(daruk: Daruk) {
    let exitHook = new ExitHook({
      onExit: (err: Error) => {
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
