/**
 * @fileOverview 日志中间件
 */

import { middleware as loggerMiddleware } from 'daruk-logger';
import { injectable } from 'inversify';
import Daruk from '../../core/daruk';
import { defineMiddleware } from '../../decorators';
import { MiddlewareClass } from '../../typings/daruk';

interface LoggerOptions {
  filter?: (ctx: Daruk['app']['context']) => boolean;
  transform?: (logObj: { [key: string]: string }, ctx: Daruk['app']['context']) => void;
  requiredLogs?: string[];
}

@defineMiddleware('daruk_logger')
@injectable()
class DarukLogger implements MiddlewareClass {
  public initMiddleware(daruk: Daruk) {
    const { filter, requiredLogs } = daruk.options.loggerMiddleware;
    const options: LoggerOptions = {
      transform(logObj, ctx) {
        // 保存日志信息到 ctx 以便后续输出日志
        ctx.access_log = logObj;
      }
    };
    // 这里必须这么写，因为 daruk-logger 内部使用的 Object.assign 传递参数
    // 如果 filter、requiredLogs 为 undefined 并且直接写在 options 中
    // 会将 daruk-logger 内部的默认值覆盖为 undefined
    // @ts-ignore
    if (filter) options.filter = filter;
    if (requiredLogs) options.requiredLogs = requiredLogs;
    return loggerMiddleware(options);
  }
}
