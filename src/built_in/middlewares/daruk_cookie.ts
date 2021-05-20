/**
 * @fileOverview koa-body 中间件
 * https://www.npmjs.com/package/koa-cookie
 */

import koaCookie from 'koa-cookie';
import Daruk from '../../core/daruk';
import { defineMiddleware } from '../../decorators';
import { MiddlewareClass } from '../../typings/daruk';

@defineMiddleware('daruk_cookie')
class KoaBody implements MiddlewareClass {
  public initMiddleware(daruk: Daruk) {
    return koaCookie();
  }
}
