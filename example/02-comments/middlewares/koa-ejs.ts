import ejs = require('koa-ejs');
import { join } from 'path';
import { Daruk, defineMiddlware, injectable, MiddlewareClass } from '../../../src';

@injectable()
@defineMiddlware('koa-ejs')
class KoaEjs implements MiddlewareClass {
  public initMiddleware(daruk: Daruk) {
    ejs(daruk.app, {
      root: join(daruk.options.rootPath, './view'),
      viewExt: 'tpl'
    });
  }
}
