/**
 * @fileOverview 优雅关机插件
 */

import ExitHook = require('daruk-exit-hook');
import { DarukCore } from '../typings/daruk';

export default (daruk: DarukCore) => {
  daruk.module.exitHook = new ExitHook({
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
};
