/** @internal */
import assert = require('assert');
/** @internal */
import is = require('is');
/** @internal */
import koa = require('koa');

import {
  CONTROLLER_CLASS_PREFIX,
  CONTROLLER_DISABLED_CLASS,
  CONTROLLER_DISABLED_METHOD,
  CONTROLLER_REDIRECT_PATH
} from './constants';

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

export function disabled() {
  return (proto: Object, propertyKey?: string, descriptor?: PropertyDescriptor) => {
    if (propertyKey) {
      const target = proto.constructor;
      Reflect.defineMetadata(CONTROLLER_DISABLED_METHOD, 'disabled', target, propertyKey);
    } else {
      Reflect.defineMetadata(CONTROLLER_DISABLED_CLASS, 'disabled', proto);
    }
  };
}

/**
 * URL 重定向
 * @param {string} path - 跳转的路径
 */
export function redirect(path: string) {
  assert(is.string(path), `[Decorator @${path}] parameter must be a string`);
  return (proto: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
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
  return (proto: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
    const oldFunc = descriptor.value;
    descriptor.value = async function typeWrap(ctx: koa.Context, next: () => Promise<void>) {
      // tslint:disable-next-line:no-invalid-this
      await oldFunc.call(this, ...arguments);
      ctx.type = type;
      await next();
    };
  };
}

/**
 *
 * @param {string|object} key
 * @param {string=} value
 */
export function header(key: string | { [key: string]: string }, value?: string) {
  assert(
    is.string(key) || is.object(key),
    `[Decorator @${key}] parameter must be a string or object`
  );
  assert(
    (is.string(key) && is.string(value)) || is.object(key),
    `[Decorator @${value}] parameter must be a string`
  );

  let headers: { [key: string]: string } = {};
  if (typeof key === 'string' && value) {
    headers[key] = value;
  } else if (typeof key === 'object') {
    headers = key;
  }

  return (proto: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
    const oldFunc = descriptor.value;
    descriptor.value = async function headerWrap(ctx: koa.Context, next: () => Promise<void>) {
      // tslint:disable-next-line:no-invalid-this
      await oldFunc.call(this, ...arguments);
      ctx.set(headers);
      await next();
    };
  };
}

export function cache(callback: (cacheKey: string, shouldCacheData?: unknown | string) => Promise<string>) {
  assert(is.function(callback), `[Decorator @${callback}] parameter must be a function`);
  return (proto: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
    const oldFunc = descriptor.value;
    descriptor.value = async function cacheWrap(ctx: koa.Context, next: () => Promise<void>) {
      let cacheKey = ctx.request.querystring;
      let cacheData = await callback(cacheKey);
      if (cacheData) {
        ctx.body = cacheData;
      } else {
        // tslint:disable-next-line:no-invalid-this
        await oldFunc.call(this, ...arguments);
        await callback(cacheKey, ctx.body);
      }
      await next();
    };
  };
}
