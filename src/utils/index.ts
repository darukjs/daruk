import is = require('is');
import { defineModulePrivateProperty } from '../decorators/constants';

/**
 * @desc 简版 class 混入装饰器
 * @param BaseClass Function - 要混入的类
 */
export function SimpleMixin(BaseClass: Function) {
  return (DerivedClass: Function) => {
    Object.getOwnPropertyNames(BaseClass.prototype).forEach((name) => {
      if (name !== 'constructor') {
        DerivedClass.prototype[name] = BaseClass.prototype[name];
      }
    });
  };
}

/**
 * @desc 同时支持导入 es6 模块和 common.js 模块
 */
export function uRequire(path: string) {
  const module = require(path);
  return module.__esModule && module.default ? module.default : module;
}

/**
 * @desc 判断 subClass 是否是 superClass 的子类
 */
export function isSubClass(subClass: any, superClass: any) {
  return superClass.isPrototypeOf(subClass);
}

export * from './debug_log';
export * from './filter_built_in_module';
export * from './is_js_ts';
