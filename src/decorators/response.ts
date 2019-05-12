import assert = require('assert');
import is = require('is');
import BaseContext from '../core/base_context';
import { Daruk } from '../typings/daruk';
import { CONTROLLER_CLASS_PREFIX, CONTROLLER_REDIRECT_PATH } from './constants';

/**
 * @desc prefix 装饰器，对controller class的所有router进行path前缀修正
 * @param {string} path - 如 /v1, /api/v1
 * @return ClassDecorator - 装饰器
 */

export function prefix(path: string) {
  assert(is.string(path), `[Decorator @${path}] parameter must be a string`);
  return (target: Function) => {
    Reflect.defineMetadata(CONTROLLER_CLASS_PREFIX, path, target);
  };
}

/**
 * @desc 将函数的返回打包到 ctx.body，并返回 application/json 类型
 * @return MethodDecorator - 装饰器
 * @example
 *    class Class {
 *      @json()
 *      index(ctx) {
 *        return {
 *          foo: 1
 *        }
 *      }
 *    }
 *    // the same as
 *    class Class {
 *      async index(ctx, next) {
 *        ctx.body = {
 *          foo: 1
 *        }
 *        ctx.type = 'application/json'
 *        await next()
 *      }
 *    }
 */
export function json() {
  return (proto: BaseContext, propertyKey: string, descriptor: PropertyDescriptor) => {
    const oldFunc = descriptor.value;
    type('application/json')(proto, propertyKey, descriptor);

    descriptor.value = async function jsonWrap(ctx: Daruk.Context, next: () => Promise<void>) {
      const val = await oldFunc(ctx);
      // 确保是Object类型
      ctx.body = { ...val };
      await next();
    };
  };
}

// json的大写别名
export const JSON = json;

/**
 * URL 重定向
 * @param {string} path - 跳转的路径
 */
export function redirect(path: string) {
  assert(is.string(path), `[Decorator @${path}] parameter must be a string`);
  return (proto: BaseContext, propertyKey: string, descriptor: PropertyDescriptor) => {
    const target = proto.constructor;
    Reflect.defineMetadata(CONTROLLER_REDIRECT_PATH, path, target, propertyKey);
  };
}

/**
 * 设置 response Content-Type
 * @param {string} type - `Content-Type` 内容
 * @example
 *    @type('.png')
 *
 *    @type('png')
 *
 *    @type('image/png')
 *
 *    @type('text/plain; charset=utf-8')
 */
export function type(type: string) {
  assert(is.string(type), `[Decorator @${type}] parameter must be a string`);
  return (proto: BaseContext, propertyKey: string, descriptor: PropertyDescriptor) => {
    const oldFunc = descriptor.value;
    descriptor.value = async function typeWrap(ctx: Daruk.Context, next: () => Promise<void>) {
      await oldFunc(ctx);
      ctx.type = type;
      await next();
    };
  };
}

export function header(key: string, value: string) {
  assert(is.string(key), `[Decorator @${key}] parameter must be a string`);
  assert(is.string(value), `[Decorator @${value}] parameter must be a string`);
  return (proto: BaseContext, propertyKey: string, descriptor: PropertyDescriptor) => {
    const oldFunc = descriptor.value;
    descriptor.value = async function headerWrap(ctx: Daruk.Context, next: () => Promise<void>) {
      await oldFunc(ctx);
      ctx.headers[key] = value;
      await next();
    };
  };
}
