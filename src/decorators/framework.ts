/**
 * @fileOverview 通过装饰器注入挂载到 daruk 的模块
 */
import assert = require('assert');
import helpDecoratorClass from './help_decorator_class';

/**
 * @desc 生成装饰器
 * @param {string} moduleName - 装饰器类型，同时也是要从 daruk 获取的模块名
 * @return Decorator - 装饰器
 */
function createDecorator(moduleName: string) {
  // 支持从指定模块中获取指定字段的内容
  return function frameworkDecorator(field?: string) {
    return (proto: any, propertyKey: string) => {
      Object.defineProperty(proto, propertyKey, {
        get: () => {
          let res = helpDecoratorClass.getModule(moduleName);
          assert(
            res !== undefined,
            `[Decorator @${moduleName}] cannot find module '${moduleName}' to inject`
          );
          if (field !== undefined) {
            res = res[field];
            assert(
              res !== undefined,
              `[Decorator @${moduleName}] '${moduleName}.${field}' does not exist`
            );
          }
          return res;
        }
      });
    };
  };
}

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

export const config = createDecorator('config');

export const util = createDecorator('util');

export const glue = createDecorator('glue');

export const logger = loggerDecorator;
