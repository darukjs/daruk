import is = require('is');
import Daruk from '../core/daruk';
import loader from '../core/loader';
import plugins from '../core/plugin';

const isFn = is.fn;
const isObj = is.object;

plugins.add('darukConfig', (daruk: Daruk) => {
  const mod = loader.loadModuleSimple('config', daruk.options.configPath);
  if (isObj(mod)) {
    daruk.mergeModule('config', { ...mod });
  } else if (isFn(mod)) {
    daruk.mergeModule('config', mod(daruk));
  }
  daruk.emit('configLoaded', daruk);
  daruk.logModuleMsg('config', daruk.module.config);
});
