/**
 * @fileOverview 根据运行时环境获取默认的 daruk options
 */

import { Options } from '../../types/daruk_options';

export default function getDefaultOptions(
  rootPath: string,
  name = 'daruk app',
  debug = true
): Options {
  return {
    name,
    rootPath,
    middlewareOrder: [],
    bodyOptions: {},
    debug,
    gracefulShutdown: {
      enable: false,
      timeout: 10 * 1000
    },
    loggerOptions: {
      level: debug ? 'info' : 'silly', // log等级，超过该级别的日志不会输出
      customLevels: {
        // 自定义log等级
        access: 2
      },
      transports: {
        file: false, // 输出日志文件的路径
        console: true // 是否在终端输出日志
      },
      overwriteConsole: !debug, // 非debug模式下，覆写 console
      logExt: {
        // 加到日志对象中的额外信息
        logType: name
      },
      fileInfo: debug,
      prettyLog: debug,
      disable: false, // 禁止输出日志
      notStringifyLevles: [
        // 不对日志的message字段进行JSON.stringify的日志等级
        'access'
      ]
    },
    customLogger: null,
    // koa logger middleware 的配置
    loggerMiddleware: {},
    requestId: {
      inject: true
    }
  };
}
