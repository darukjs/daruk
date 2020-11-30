import { DarukContext, DarukServer } from '../../src';

(async () => {
  const debug = false;
  // 这个 yourLogger 可以自己定义写入方式和格式, 脱离 daruk 的日志格式
  const yourLogger = {
    info(msg: string) {
      // 这里按照你的需求处理日志，比如使用 Winston
      // 如果使用 pm2，直接 console 就会输出到文件
      console.log(msg);
    },
    debug(msg: string) {},
    warn(msg: string) {},
    error(msg: string) {},
    access(accessLogInfo: any, ctx: DarukContext) {
      console.log(JSON.stringify(accessLogInfo));
    }
  };

  let app = DarukServer({
    name: '06-logger-custom',
    debug,
    customLogger: debug ? null : yourLogger
  });
  let port = 3000;
  await app.loadFile('./controllers');
  await app.binding();
  app.listen(port);
  app.logger.info(`app listen port ${port}`);
})();
