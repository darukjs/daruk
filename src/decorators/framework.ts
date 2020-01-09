/**
 * @fileOverview 通过装饰器注入挂载到 daruk 的模块
 */
import assert = require('assert');
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

export const logger = loggerDecorator;
