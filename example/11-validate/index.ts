import { controller, DarukContext, DarukServer, get, Next, validate } from '../../src';

@controller()
class test_validate {
  @get('/')
  @validate({
    name: {
      type: 'string',
      required: true
    }
  })
  public async index(ctx: DarukContext, next: Next) {
    ctx.body = ctx.query.name;
  }
}

(async () => {
  let app = DarukServer({
    // https://www.npmjs.com/package/parameter
    validateOptions: {
      error: true
    }
  });
  let port = 3000;
  await app.binding();
  app.listen(port);
  app.logger.info(`app listen port ${port}`);
})();
