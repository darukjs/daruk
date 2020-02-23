import { DarukServer } from '../../src';

(async () => {
  let app = DarukServer();
  let port = 3000;

  app.initOptions({
    rootPath: __dirname,
    middlewareOrder: ['koa-ejs', 'koa-favicon']
  });

  await app.loadFile('./middlewares');
  await app.loadFile('./glues');
  await app.loadFile('./controllers');
  await app.loadFile('./services');
  await app.initPlugin();

  app.listen(port);
  app.logger.info(`app listen port ${port}`);
})();
