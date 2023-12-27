import { controller, DarukContext, DarukServer, get, Next } from '../../src';
import { join } from 'path';

@controller()
class HelloWorld {
  // https://github.com/Surnet/swagger-jsdoc/tree/v6/docs
  // https://swagger.io/docs/specification/describing-parameters/
  /**
   * @openapi
   * /:
   *  get:
   *   summary: Index page
   *   description: Welcome to swagger-jsdoc!
   *   tags:
   *     - WebPage
   *   parameters:
   *     - name: username
   *       in: query
   *       description: username
   *       required: false
   *       default: nobody
   *       schema:
   *         type: string
   *   responses:
   *    200:
   *      description: Returns hello world string;
   *      content:
   *       text/plain:
   *        schema:
   *         type: string
   *         example: hello world nobody
   */
  @get('/')
  public async index(ctx: DarukContext, next: Next) {
    let username = ctx.query.username || 'nobody';
    ctx.body = `hello world ${username}`;
  }
}

(async () => {
  let port = 3000;
  let app = DarukServer({
    swagger: {
      prefix: '/swagger',
      title: 'swagger demo',
      description: 'swagger daruk example',
      version: '1.0.1',
      enable: true,
      host: `localhost:${port}`,
      basePath: '/',
      apis: [join(__dirname, './index.ts')]
    }
  });
  await app.binding();
  app.listen(port);
  app.logger.info(`app listen port ${port}`);
})();
