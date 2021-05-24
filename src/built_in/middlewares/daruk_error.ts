/**
 * @fileOverview koa-error 中间件
 */

import error from 'koa-onerror';
import Daruk from '../../core/daruk';
import { defineMiddleware } from '../../decorators';
import { MiddlewareClass } from '../../typings/daruk';

@defineMiddleware('daruk_error')
class KoaBody implements MiddlewareClass {
  public initMiddleware(daruk: Daruk) {
    error(daruk.app, daruk.options.errorOptions);
  }
}
