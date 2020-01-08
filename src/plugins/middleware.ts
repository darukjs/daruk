import { join } from 'path';
import Daruk from '../core/daruk';
import loader from '../core/loader';
import plugins from '../core/plugin';

plugins.add('darukMiddleware', (daruk: Daruk) => {
  // 加载内置中间件
  const buildInMiddleware = loader.loadModule(
    'middleware',
    join(__dirname, '../built_in/middlewares')
  );
  daruk.mergeModule('middleware', buildInMiddleware);
  const middleware = loader.loadModule('middleware', daruk.options.middlewarePath);
  daruk.mergeModule('middleware', middleware);
  daruk.emit('middlewareLoaded', daruk);
  daruk.logModuleMsg('middleware', daruk.module.middleware);
});
