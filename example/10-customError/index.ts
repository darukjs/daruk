import { controller, DarukContext, DarukServer, get, Next } from '../../src';

@controller()
class error {
  @get('/')
  public async index(ctx: DarukContext, next: Next) {
    throw new Error('my error');
  }
}

(async () => {
  let app = DarukServer({
    // 匹配的是 request accept
    errorOptions: {
      html: (err: Error, ctx: DarukContext) => {
        ctx.body = `${err.message}`;
      }
    }
  });
  let port = 3000;
  await app.binding();
  app.listen(port);
  app.logger.info(`app listen port ${port}`);
})();
