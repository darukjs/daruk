/**
 * @fileOverview koa-notFound 中间件
 */

import Daruk from '../../core/daruk';
import { defineMiddleware } from '../../decorators';
import { DarukContext, MiddlewareClass, Next } from '../../typings/daruk';

@defineMiddleware('daruk_notFound')
class KoaBody implements MiddlewareClass {
  public initMiddleware(daruk: Daruk) {
    return async (ctx: DarukContext, next: Next) => {
      try {
        await next();
        // tslint:disable-next-line:no-magic-numbers
        if (ctx.status === 404 && daruk.options.notFound) {
          daruk.options.notFound(ctx);
        }
      } catch (err) {
        ctx.throw(err,500);
      }
    };
  }
}
