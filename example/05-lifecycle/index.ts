import { Daruk, DarukContext, DarukServer } from '../../src';

(async () => {
  let app = DarukServer();
  const port = 3000;
  app.initOptions({
    rootPath: __dirname,
    debug: process.env.NODE_ENV === 'dev'
  });

  app.on('access', (ctx: DarukContext) => {
    console.log(ctx.request.id);
  });

  app.on('exit', (err: Error, daruk: Daruk) => {
    // maybe you can send a exit error or email
    daruk.logger.error('exit');
  });

  await app.loadFile('./controllers');
  await app.initPlugin();

  app.listen(port);
})();
