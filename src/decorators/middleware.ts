import assert = require('assert');
import is = require('is');
import { darukContainer } from '../core/inversify.config';
import { TYPES } from '../core/types';
import { Constructor } from '../typings/daruk';
import { MIDDLEWARE_NAME } from './constants';

/**
 * @desc middleware 中间件装饰器
 * @param {string} middlewareName - 中间件的名字
 * @return Decorator - 装饰器
 */

export function middleware(middlewareName: string, options?: { [key: string]: any }) {
  assert(is.string(middlewareName), `[Decorator @middleware] parameter must be a string`);
  return (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
    // 一个路由 handle 可能被多个 @middleware 修饰
    const middleares = Reflect.getMetadata(MIDDLEWARE_NAME, target.constructor, propertyKey) || [];
    middleares.push({ middlewareName, options });
    // 保存 @middleware 应用的所有中间件名字
    Reflect.defineMetadata(MIDDLEWARE_NAME, middleares, target.constructor, propertyKey);
  };
}

export function defineMiddleware(middlewareName: string) {
  return (target: Constructor) => {
    darukContainer
      .bind<Constructor>(TYPES.Middleware)
      .to(target)
      .whenTargetNamed(middlewareName);
  };
}
