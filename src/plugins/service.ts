import Daruk from '../core/daruk';
import loader from '../core/loader';
import plugins from '../core/plugin';
import { logModuleMsg } from '../utils';

plugins.add('darukService', ['darukRouter'], (daruk: Daruk) => {
  const services = loader.loadClassModule('service', daruk.options.servicePath);
  daruk.mergeModule('service', services);
  daruk.emit('serviceLoaded', daruk);
  logModuleMsg('service', daruk.module.services, daruk.prettyLog);
  // 立刻执行
  Object.keys(services).forEach((name) => {
    services[name](daruk);
  });
});
