import assert = require('assert');
import is = require('is');
import { CONTROLLER_FUNC_NAME, CONTROLLER_PATH } from './constants';

/** @internal */
function handleMethodDecorator(method: string, path: string, proto: Object, propertyKey: string) {
  assert(is.string(path), `[Decorator @${method}] parameter must be a string`);
  const target = proto.constructor;
  // 获取该类上已经被装饰器装饰过的方法
  const funcs = Reflect.getMetadata(CONTROLLER_FUNC_NAME, target) || [];
  // 加入当前方法名
  funcs.push(propertyKey);
  // 保存该类中被装饰过的方法
  Reflect.defineMetadata(CONTROLLER_FUNC_NAME, funcs, target);
  let routerMetas = Reflect.getMetadata(CONTROLLER_PATH, target, propertyKey) || [];
  routerMetas.push({
    method,
    path
  });
  Reflect.defineMetadata(CONTROLLER_PATH, routerMetas, target, propertyKey);
}

/**
 * @decorator
 * @param path
 */
export function post(path: string) {
  return (proto: Object, propertyKey: string) => {
    handleMethodDecorator('post', path, proto, propertyKey);
  };
}

export function get(path: string) {
  return (proto: Object, propertyKey: string) => {
    handleMethodDecorator('get', path, proto, propertyKey);
  };
}

export function del(path: string) {
  return (proto: Object, propertyKey: string) => {
    handleMethodDecorator('delete', path, proto, propertyKey);
  };
}

export function put(path: string) {
  return (proto: Object, propertyKey: string) => {
    handleMethodDecorator('put', path, proto, propertyKey);
  };
}

export function patch(path: string) {
  return (proto: Object, propertyKey: string) => {
    handleMethodDecorator('patch', path, proto, propertyKey);
  };
}

export function options(path: string) {
  return (proto: Object, propertyKey: string) => {
    handleMethodDecorator('options', path, proto, propertyKey);
  };
}

export function head(path: string) {
  return (proto: Object, propertyKey: string) => {
    handleMethodDecorator('head', path, proto, propertyKey);
  };
}

export function all(path: string) {
  return (proto: Object, propertyKey: string) => {
    handleMethodDecorator('all', path, proto, propertyKey);
  };
}
