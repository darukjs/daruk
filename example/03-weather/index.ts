import { DarukServer } from '../../src';
import config from './config';

(async () => {
  let app = DarukServer();

  app.initOptions({
    name: 'myapp',
    rootPath: __dirname,
    debug: process.env.NODE_ENV === 'dev'
  });

  await app.loadFile('./glues');
  await app.loadFile('./services');
  await app.loadFile('./middlewares');
  await app.loadFile('./controllers');
  await app.initPlugin();
  app.listen(config.port);
  app.logger.info(`app listen port ${config.port}`);
})();
