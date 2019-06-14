import Daruk from '../core/daruk';
import loader from '../core/loader';
import plugins from '../core/plugin';

plugins.add('darukService', ['darukRouter', 'darukUtil', 'darukGlue'], (daruk: Daruk) => {
  const services = loader.loadClassModule('service', daruk.options.servicePath);
  daruk.mergeModule('service', services);
  daruk.emit('serviceLoaded', daruk);
  daruk.logModuleMsg('service', daruk.module.services);
});
