/**
 * 框架直接以文件名作为路由前缀，controller 装饰器暂时不使用
 */

import assert = require('assert');
import is = require('is');
import { darukContainer } from '../core/inversify.config';
import { TYPES } from '../core/types';
import { Constructor } from '../typings/daruk';

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
