import {
  controller,
  DarukContext,
  DarukServer,
  get,
  Next,
  request,
  responses,
  summary
} from '../../src';

@controller()
class HelloWorld {
  @request('get', '/')
  @summary('daruk controller helloworld')
  @responses({
    200: { description: 'hello world' }
  })
  @get('/')
  public static async index(ctx: DarukContext, next: Next) {
    ctx.body = 'hello world';
  }
}

(async () => {
  let app = DarukServer({
    routerType: 'swagger'
  });
  let port = 3000;
  await app.binding();
  app.listen(port);
  app.logger.info(`app listen port ${port}`);
})();
