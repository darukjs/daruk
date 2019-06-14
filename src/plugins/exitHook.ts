/**
 * @fileOverview 优雅关机插件
 */

import ExitHook = require('daruk-exit-hook');
import Daruk from '../core/daruk';
import plugins from '../core/plugin';

interface DarukExitHook extends Daruk {
  exitHook: ExitHook;
}

plugins.add('darukExitHook', [], (daruk: DarukExitHook) => {
  daruk.exitHook = new ExitHook({
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
});
