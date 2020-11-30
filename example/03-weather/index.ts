import { DarukServer } from '../../src';
import config from './config';

(async () => {
  let app = DarukServer({
    name: 'myapp',
    rootPath: __dirname,
    // 也可以放404的中间件
    middlewareOrder: [/*'xxx404',*/ 'errorMid', 'cors']
  });

  await app.loadFile('./glues');
  await app.loadFile('./services');
  await app.loadFile('./middlewares');
  await app.loadFile('./controllers');
  await app.binding();
  app.listen(config.port);
  app.logger.info(`app listen port ${config.port}`);
})();
