/**
 * @fileOverview 优雅关机插件
 */

import ExitHook = require('daruk-exit-hook');
import Daruk from '../core/daruk';

export default async (daruk: Daruk) => {
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
