import assert = require('assert');
import is = require('is');
// tslint:disable-next-line
import 'reflect-metadata';
import BaseContext from '../core/base_context';
import { MIDDLEWARE_NAME } from './constants';

/**
 * @desc middleware 中间件装饰器
 * @param string middlewareName - 中间件的名字
 * @return Decorator - 装饰器
 */
export function middleware(middlewareName: string) {
  assert(is.string(middlewareName), `[Decorator @middleware] parameter must be a string`);
  return (target: BaseContext, propertyKey: string, descriptor: PropertyDescriptor) => {
    // 保存装饰器使用的中间件名字
    Reflect.defineMetadata(MIDDLEWARE_NAME, middlewareName, target.constructor, propertyKey);
  };
}
