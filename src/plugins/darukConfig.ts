import assert = require('assert');
import fs = require('fs');
import is = require('is');
import Daruk from '../core/daruk';
import { uRequire } from '../utils';

const isFn = is.fn;

export default async (daruk: Daruk) => {
  const path = daruk.options.darukConfigPath;
  // 在 ts 的 dev 环境，文件名是 daruk.config.ts
  if (!fs.existsSync(path + '.js') && !fs.existsSync(path + '.ts')) return;
  const mod = uRequire(path);
  assert(isFn(mod), `DarukConfig must export a function, ${path}`);
  const DarukConfig = mod(daruk);
  // daruk config 支持的配置类型
  const validConfigKey = ['timer', 'middleware', 'middlewareOrder', 'globalModule'];
  validConfigKey.forEach((key) => {
    if (!DarukConfig[key]) return;
    // 特殊处理 middleware
    if (key === 'middleware') {
      const { middleware, globalMiddleware } = daruk.loader.loadDarukConfigMid(DarukConfig[key]);
      daruk.mergeModule('middleware', middleware);
      daruk.mergeModule('globalMiddleware', globalMiddleware);
      return;
    }
    // 特殊处理 middlewareOrder
    if (key === 'middlewareOrder') {
      daruk.setArrayModule('middlewareOrder', DarukConfig[key]);
      return;
    }
    daruk.mergeModule(key, DarukConfig[key]);
  });

  daruk.emit('darukConfigLoaded', daruk);
  daruk.logModuleMsg('globalModule', daruk.module.globalModule);
};
