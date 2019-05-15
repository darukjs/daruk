/**
 * 框架直接以文件名作为路由前缀，controller 装饰器暂时不使用
 */

import assert = require('assert');
import is = require('is');
// tslint:disable-next-line
import 'reflect-metadata';
import BaseContext from '../core/base_context';
import { CONTROLLER_PREFIX_PATH } from './constants';

/**
 * @desc controller 装饰器，将类装饰为 controller
 * @param {string} prefixPath - 路由前缀
 * @return Decorator - 装饰器
 */

export function controller(prefixPath: string) {
  /*
  assert(is.string(prefixPath), '[Decorator @controller] parameter must be a string');
  return (target: any) => {
    // 将路由前缀信息保存到当前的类
    Reflect.defineMetadata(CONTROLLER_PREFIX_PATH, prefixPath, target);
  };
  */
}
