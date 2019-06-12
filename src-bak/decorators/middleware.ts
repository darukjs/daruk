import assert = require('assert');
import is = require('is');
// tslint:disable-next-line
import 'reflect-metadata';
import BaseContext from '../core/base_context';
import { MIDDLEWARE_NAME } from './constants';

/**
 * @desc middleware 中间件装饰器
 * @param {string} middlewareName - 中间件的名字
 * @return Decorator - 装饰器
 */
export function middleware(middlewareName: string, options?: any) {
  assert(is.string(middlewareName), `[Decorator @middleware] parameter must be a string`);
  return (target: BaseContext, propertyKey: string, descriptor: PropertyDescriptor) => {
    // 一个路由 handle 可能被多个 @middleware 修饰
    const middleares = Reflect.getMetadata(MIDDLEWARE_NAME, target.constructor, propertyKey) || [];
    middleares.push({ middlewareName, options });
    // 保存 @middleware 应用的所有中间件名字
    Reflect.defineMetadata(MIDDLEWARE_NAME, middleares, target.constructor, propertyKey);
  };
}
