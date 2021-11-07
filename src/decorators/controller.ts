/**
 * 框架直接以文件名作为路由前缀，controller 装饰器暂时不使用
 */

import { injectable } from 'inversify';
import { Constructor } from '../typings/daruk';
import { CONTROLLER_CLASS, CONTROLLER_MIDDLEWARES, CONTROLLER_PRIORITY, CONTROLLER_CLASS_PREFIX } from './constants';

/**
 * @desc controller 装饰器，将类装饰为 controller
 * @param {String | Array} prefixOrMiddlewares - String：整个类路由前缀  Array：整个类的中间件数组
 * @return Decorator - 装饰器
 */
export function controller(
  prefixOrMiddlewares?: string
) : (target: Constructor) => void
export function controller(
  prefixOrMiddlewares?: [{ middlewareName: string; options?: { [key: string]: any } }]
): (target: Constructor) => void
export function controller(
  prefixOrMiddlewares?: [{ middlewareName: string; options?: { [key: string]: any } }] | string
) {
  return (target: Constructor) => {
    injectable()(target);

    if (typeof prefixOrMiddlewares === "string") {
      Reflect.defineMetadata(CONTROLLER_CLASS_PREFIX, prefixOrMiddlewares, target);
    } else {
      Reflect.defineMetadata(CONTROLLER_MIDDLEWARES, prefixOrMiddlewares, target);
    }

    let Controllers = Reflect.getMetadata(CONTROLLER_CLASS, Reflect) || [];
    let newMetadata = [target].concat(Controllers);
    Reflect.defineMetadata(CONTROLLER_CLASS, newMetadata, Reflect);
  };
}

export function priority(priority: number) {
  return (target: Constructor) => {
    Reflect.defineMetadata(CONTROLLER_PRIORITY, priority, target);
  };
}
