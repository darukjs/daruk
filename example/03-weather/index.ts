import { DarukServer } from '../../src';
import config from './config';

(async () => {
  let app = DarukServer({
    name: 'myapp',
    rootPath: __dirname
  });

  await app.loadFile('./glues');
  await app.loadFile('./services');
  await app.loadFile('./middlewares');
  await app.loadFile('./controllers');
  await app.binding();
  app.listen(config.port);
  app.logger.info(`app listen port ${config.port}`);
})();
