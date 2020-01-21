/**
 * 框架直接以文件名作为路由前缀，controller 装饰器暂时不使用
 */

import { darukContainer } from '../core/inversify.config';
import { TYPES } from '../core/types';
import { Constructor } from '../typings/daruk';
import { CONTROLLER_PRIORITY } from './constants';

/**
 * @desc controller 装饰器，将类装饰为 controller
 * @param {string} prefixPath - 路由前缀
 * @return Decorator - 装饰器
 */

export function controller() {
  return (target: Constructor) => {
    darukContainer.bind<Constructor>(TYPES.ControllerClass).toConstructor(target);
  };
}

export function priority(priority: number) {
  return (target: Constructor) => {
    Reflect.defineMetadata(CONTROLLER_PRIORITY, priority, target);
  };
}
