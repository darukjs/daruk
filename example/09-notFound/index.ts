import { controller, DarukContext, DarukServer, get, Next } from '../../src';

@controller()
class notFound {
  @get('/')
  public async index(ctx: DarukContext, next: Next) {
    ctx.body = 'hello world';
  }
}

(async () => {
  let app = DarukServer({
    notFound: (ctx: DarukContext) => {
      ctx.body = '404';
    }
  });
  let port = 3000;
  await app.binding();
  app.listen(port);
  app.logger.info(`app listen port ${port}`);
})();
