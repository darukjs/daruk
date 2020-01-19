/**
 * @fileOverview koa-body 中间件
 * https://github.com/dlau/koa-body
 */

import { injectable } from 'inversify';
import koaBody = require('koa-body');
import Daruk from '../../core/daruk';
import { defineMiddlware } from '../../decorators';
import { middlewareClass } from '../../typings/daruk';

@defineMiddlware('daruk_body')
@injectable()
class KoaBody implements middlewareClass {
  public initMiddleware(daruk: Daruk) {
    return koaBody(daruk.options.bodyOptions);
  }
}
