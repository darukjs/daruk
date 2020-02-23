/**
 * @fileOverview koa-body 中间件
 * https://github.com/dlau/koa-body
 */

import { injectable } from 'inversify';
import koaBody = require('koa-body');
import Daruk from '../../core/daruk';
import { defineMiddleware } from '../../decorators';
import { MiddlewareClass } from '../../typings/daruk';

@defineMiddleware('daruk_body')
@injectable()
class KoaBody implements MiddlewareClass {
  public initMiddleware(daruk: Daruk) {
    return koaBody(daruk.options.bodyOptions);
  }
}
