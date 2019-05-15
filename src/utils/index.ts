import is = require("is");
import { defineModulePrivateProperty } from "../decorators/constants";

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

export function deepDefineProperty(target: any, key: PropertyKey, value: any): void {
  const privateKey = defineModulePrivateProperty(key);
  if (is.undefined(target[key])) {
    Object.defineProperty(target, privateKey, {
      writable: true,
      configurable: true,
      enumerable: false,
      value
    });
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: true,
      get() {
        return target[privateKey];
      },
      set(val): void {
        // 提醒用户不能直接修改
        throw new SyntaxError('[daruk error] user could not change module directly\nplease use function\'setModule\'');
      }
    });
  } else if (typeof value !== 'object') {
    target[privateKey] = value;
  }
  if (typeof value === 'object') {
    Object.keys(value).forEach(innerKey => {
      deepDefineProperty(target[key], innerKey, target[key][innerKey]);
    });
  }
}

export * from './debug_log';
export * from './filter_built_in_module';
export * from './is_js_ts';
