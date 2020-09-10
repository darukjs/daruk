/**
 * 框架直接以文件名作为路由前缀，controller 装饰器暂时不使用
 */

import { injectable } from 'inversify';
import { darukContainer } from '../core/inversify.config';
import { TYPES } from '../core/types';
import { Constructor } from '../typings/daruk';
import { CONTROLLER_MIDDLEWARES, CONTROLLER_PRIORITY } from './constants';

/**
 * @desc controller 装饰器，将类装饰为 controller
 * @param {Array} middlewares - 整个类的中间件数组
 * @return Decorator - 装饰器
 */

export function controller(
  middlewares?: [{ middlewareName: string; options?: { [key: string]: any } }]
) {
  return (target: Constructor) => {
    Reflect.defineMetadata(CONTROLLER_MIDDLEWARES, middlewares, target);
    injectable()(target);
    darukContainer.bind<Constructor>(TYPES.ControllerClass).toConstructor(target);
  };
}

export function priority(priority: number) {
  return (target: Constructor) => {
    Reflect.defineMetadata(CONTROLLER_PRIORITY, priority, target);
  };
}
