import assert = require('assert');
import { injectable } from 'inversify';
import is = require('is');
import { darukContainer } from '../core/inversify.config';
import { TYPES } from '../core/types';
import { Constructor, MiddlewareConfig, MiddlewareConfigOptions } from '../typings/daruk';
import { CONTROLLER_MIDDLEWARES, MIDDLEWARE_NAME } from './constants';

/**
 * @desc 定义中间件的装饰器
 * @param middlewareName - 中间件的名字
 * @returns ClassDecorator - 装饰器
 */
export function defineMiddleware(middlewareName: string) {
  return (target: Constructor) => {
    injectable()(target);
    darukContainer.bind<Constructor>(TYPES.Middleware).to(target).whenTargetNamed(middlewareName);
  };
}

/**
 * @desc middleware 中间件装饰器
 * @param {string} middlewareName - 中间件的名字
 * @param options
 * @return MethodDecorator & ClassDecorator - 装饰器
 */
export function middleware(
  middleware: string | MiddlewareConfig[],
  options?: MiddlewareConfigOptions
) {
  assert(
    is.string(middleware) || is.array(middleware),
    `[Decorator @middleware] parameter must be a string or array`
  );
  return (target: Object | Constructor, propertyKey?: string, descriptor?: PropertyDescriptor) => {
    // 判断装饰对象是函数还是类
    if (propertyKey && descriptor) {
      // target为被装饰类的 prototype
      defineFunMeta(target.constructor as Constructor, propertyKey, middleware, options);
    } else {
      // target为被装饰类 (即constructor函数)
      defineControllerMeta(target as Constructor, middleware, options);
    }

    // // 一个路由 handle 可能被多个 @middleware 修饰
    // const middleares = Reflect.getMetadata(MIDDLEWARE_NAME, target.constructor, propertyKey) || [];
    // middleares.push({ middlewareName, options });
    // // 保存 @middleware 应用的所有中间件名字
    // Reflect.defineMetadata(MIDDLEWARE_NAME, middleares, target.constructor, propertyKey);
  };
}

function defineFunMeta(
  TargetClass: Constructor,
  propertyKey: string,
  middleware: string | MiddlewareConfig[],
  options?: MiddlewareConfigOptions
) {
  // 一个路由 handle 可能被多个 @middleware 修饰
  let middlewareList: MiddlewareConfig[] =
    Reflect.getMetadata(MIDDLEWARE_NAME, TargetClass, propertyKey) || [];

  // 如果传入的middleware参数是数组，则连接
  // 如果是字符串 则添加
  if (Array.isArray(middleware)) {
    middlewareList = middlewareList.concat(middleware);
  } else {
    middlewareList.push({ middlewareName: middleware, options });
  }

  // 保存 @middleware 应用的所有中间件名字
  Reflect.defineMetadata(MIDDLEWARE_NAME, middlewareList, TargetClass, propertyKey);
}

function defineControllerMeta(
  TargetClass: Constructor,
  middleware: string | MiddlewareConfig[],
  options?: MiddlewareConfigOptions
) {
  let middlewareList: MiddlewareConfig[] =
    Reflect.getMetadata(CONTROLLER_MIDDLEWARES, TargetClass) || [];

  // 如果传入的middleware参数是数组，则连接
  // 如果是字符串 则添加
  if (Array.isArray(middleware)) {
    middlewareList = middlewareList.concat(middleware);
  } else {
    middlewareList.push({ middlewareName: middleware, options });
  }

  Reflect.defineMetadata(CONTROLLER_MIDDLEWARES, middlewareList, TargetClass);
}
