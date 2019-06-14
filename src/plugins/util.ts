import is = require('is');
import Daruk from '../core/daruk';
import loader from '../core/loader';
import plugins from '../core/plugin';

const isFn = is.fn;
const isObj = is.object;

plugins.add('darukUtil', ['darukRouter'], (daruk: Daruk) => {
  const mod = loader.loadModuleSimple('util', daruk.options.utilPath);
  if (isObj(mod)) {
    daruk.mergeModule('util', { ...mod });
  } else if (isFn(mod)) {
    daruk.mergeModule('util', mod(daruk));
  }
  daruk.emit('utilLoaded', daruk);
  daruk.logModuleMsg('util', daruk.module.util);
});
