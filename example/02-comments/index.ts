import { DarukServer } from '../../src';

(async () => {
  let app = DarukServer({
    rootPath: __dirname,
    middlewareOrder: ['koa-ejs', 'koa-favicon']
  });
  let port = 3000;

  await app.loadFile('./middlewares');
  await app.loadFile('./glues');
  await app.loadFile('./controllers');
  await app.loadFile('./services');
  await app.binding();

  app.listen(port);
  app.logger.info(`app listen port ${port}`);
})();
