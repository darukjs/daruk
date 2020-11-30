import { resolve } from 'path';
import { DarukServer } from '../../src';

(async () => {
  let debug = false;
  let app = DarukServer({
    name: '06-logger-default',
    debug,
    loggerOptions: {
      level: debug ? 'info' : 'silly', // log等级，超过该级别的日志不会输出
      customLevels: {
        // 自定义log等级
        access: 2
      },
      transports: {
        file: resolve(__dirname, 'app.log'), // 输出日志文件的路径
        console: debug // 是否在终端输出日志
      },
      overwriteConsole: !debug, // 非debug模式下，覆写 console
      logExt: {
        // 加到日志对象中的额外信息
        logType: 'daruk-logger-default'
      },
      fileInfo: debug, // 在开发环境下，输出打印日志的文件信息,线上不要用， 影响性能
      prettyLog: debug, // 是否美化输出日志
      disable: false, // 禁止输出日志
      notStringifyLevles: [
        // 不对日志的message字段进行JSON.stringify的日志等级
        'access'
      ]
    }
  });
  const port = 3000;
  await app.loadFile('./controllers');
  await app.binding();
  app.listen(port);
  app.logger.info(`app listen port ${port}`);
})();
