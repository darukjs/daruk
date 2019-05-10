import {
  all,
  BaseController,
  del,
  get,
  head,
  json,
  JSON,
  middleware,
  options,
  patch,
  post,
  put,
  redirect
} from '../../../../src';
import { Daruk } from '../../../../src/typings/daruk';

export default class Index extends BaseController {
  @all('/all')
  public async all(ctx: Daruk.Context, next: Function) {
    ctx.body = '';
  }
  @del('/del')
  public async del(ctx: Daruk.Context, next: Function) {
    ctx.body = '';
  }
  @get('/get')
  public async get(ctx: Daruk.Context, next: Function) {
    ctx.body = '';
  }
  @head('/head')
  public async head(ctx: Daruk.Context, next: Function) {
    ctx.body = '';
  }
  @options('/options')
  public async options(ctx: Daruk.Context, next: Function) {
    ctx.body = '';
  }
  @patch('/patch')
  public async patch(ctx: Daruk.Context, next: Function) {
    ctx.body = '';
  }
  @post('/post')
  public async post(ctx: Daruk.Context, next: Function) {
    ctx.body = '';
  }
  @put('/put')
  public async put(ctx: Daruk.Context, next: Function) {
    ctx.body = '';
  }
  @json()
  @get('/json1')
  public json() {
    return { foo: 1 };
  }
  @get('/json2')
  @JSON()
  public JSON() {
    return { foo: 1 };
  }
  @redirect('/json2')
  @get('/redirect')
  public redirect(ctx: Daruk.Context) {
    ctx.body = '';
  }

  @middleware('routeMiddleware')
  @get('/middleware')
  public async middleware(ctx: Daruk.Context, next: Function) {}

  @middleware('multiRouteMiddleware')
  @middleware('routeMiddleware')
  @get('/multiMiddleware')
  public async multiMiddleware(ctx: Daruk.Context, next: Function) {}
}
