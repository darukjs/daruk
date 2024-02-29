import { Daruk, DarukContext, DarukServer, darukContainer, TYPES } from '../../src';

(async () => {
  let app = DarukServer({
    rootPath: __dirname
  });
  const port = 3000;

  app.on('access', (ctx: DarukContext) => {
    console.log(ctx.request.id);
  });

  app.on('exit', (err: Error, daruk: Daruk) => {
    // maybe you can send a exit error or email
    daruk.logger.error('exit');
  });

  await app.loadFile('./controllers');
  await app.binding();

  const DarukExitHook = darukContainer.getNamed(TYPES.PluginInstance, 'DarukExitHook');
  //@ts-ignore
  DarukExitHook.addHook(async (err, cb) => {
    setTimeout(() => {
      console.log(err, 'exit hook !!!');
      cb();
    }, 1000);
  });

  app.listen(port);
})();
