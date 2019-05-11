import assert = require('assert');
import is = require('is');
// tslint:disable-next-line
import 'reflect-metadata';
import BaseContext from '../core/base_context';
import {
  CONTROLLER_FUNC_NAME,
  CONTROLLER_PATH,
} from './constants';

/**
 * @desc 生成 http method 装饰器
 * @param {string} method - http method，如 get、post、head
 * @return Decorator - 装饰器
 */
function createMethodDecorator(method: string) {
  // 装饰器接收路由 path 作为参数
  return function httpMethodDecorator(path: string) {
    assert(is.string(path), `[Decorator @${method}] parameter must be a string`);
    return (proto: BaseContext, propertyKey: string, descriptor: PropertyDescriptor) => {
      const target = proto.constructor;
      // 获取该类上已经被装饰器装饰过的方法
      const funcs = Reflect.getMetadata(CONTROLLER_FUNC_NAME, target) || [];
      // 加入当前方法名
      funcs.push(propertyKey);
      // 保存该类中被装饰过的方法
      Reflect.defineMetadata(CONTROLLER_FUNC_NAME, funcs, target);
      const routerMeta = {
        method,
        path
      };
      Reflect.defineMetadata(CONTROLLER_PATH, routerMeta, target, propertyKey);
    };
  };
}

// 导出 http method 装饰器

export const post = createMethodDecorator('post');

export const get = createMethodDecorator('get');

export const del = createMethodDecorator('del');

export const put = createMethodDecorator('put');

export const patch = createMethodDecorator('patch');

export const options = createMethodDecorator('options');

export const head = createMethodDecorator('head');

export const all = createMethodDecorator('all');
