import ejs = require('koa-ejs');
import { join } from 'path';
import { Daruk, defineMiddleware, injectable, MiddlewareClass } from '../../../src';

@injectable()
@defineMiddleware('koa-ejs')
class KoaEjs implements MiddlewareClass {
  public initMiddleware(daruk: Daruk) {
    ejs(daruk.app, {
      root: join(daruk.options.rootPath, './view'),
      viewExt: 'tpl'
    });
  }
}
