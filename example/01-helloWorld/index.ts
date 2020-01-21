import { controller, DarukServer, get, injectable } from '../../src';

@injectable()
@controller()
class HelloWorld {
  @get('/')
  public async index(ctx: any) {
    ctx.body = 'hello world';
  }
}

(async () => {
  let app = DarukServer();
  let port = 3000;
  app.initOptions();
  await app.initPlugin();
  app.listen(port);
  app.logger.info(`app listen port ${port}`);
})();
