import Daruk from '../core/daruk';
import loader from '../core/loader';
import plugins from '../core/plugin';

plugins.add('darukGlue', (daruk: Daruk) => {
  const glue = loader.loadModule('glue', daruk.options.gluePath);
  daruk.mergeModule('glue', glue);
  daruk.emit('glueLoaded', daruk);
  daruk.logModuleMsg('glue', daruk.module.glue);
});
