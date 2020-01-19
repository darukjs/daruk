/**
 * @fileOverview 通过装饰器注入挂载到 daruk 的模块
 */
import { darukContainer } from '../core/inversify.config';
import { TYPES } from '../core/types';
import { Constructor, pluginClass, timerClass } from '../typings/daruk';
import helpDecoratorClass from './help_decorator_class';

/**
 * @desc logger 装饰器
 * @param {string} fileInfo - 支持自定义 logger 输出的日志中的 fileinfo 字段
 */
function loggerDecorator(fileInfo?: string) {
  return (proto: any, propertyKey: string) => {
    const logger = helpDecoratorClass.getModule('logger');
    if (fileInfo === undefined) {
      proto[propertyKey] = logger;
    } else {
      proto[propertyKey] = logger.customFileInfo(fileInfo);
    }
  };
}

export function plugin() {
  return (target: Constructor) => {
    darukContainer.bind<pluginClass>(TYPES.PLUGINCLASS).to(target);
  };
}

export function timer() {
  return (target: Constructor) => {
    darukContainer.bind<timerClass>(TYPES.Timer).to(target);
  };
}

export const logger = loggerDecorator;
