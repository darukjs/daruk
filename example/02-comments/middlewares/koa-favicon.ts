import favicon = require('koa-favicon');
import { Daruk, defineMiddlware, injectable, MiddlewareClass } from '../../../src';

@injectable()
@defineMiddlware('koa-favicon')
class Favicon implements MiddlewareClass {
  public initMiddleware(daruk: Daruk) {
    return favicon(`${daruk.options.rootPath}/public/favicon.png`);
  }
}
