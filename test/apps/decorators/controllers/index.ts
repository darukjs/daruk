import {
  all,
  BaseController,
  del,
  get,
  head,
  header,
  JSON,
  json,
  middleware,
  options,
  patch,
  post,
  put,
  redirect,
  type
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
  @type('application/json')
  @get('/type')
  public type(ctx: Daruk.Context) {
    ctx.body = {
      foo: 1
    };
  }

  @header('foo', 'bar')
  @get('/header')
  public header(ctx: Daruk.Context) {
    ctx.body = 'bar';
  }

  @header({foo: 'bar'})
  @get('/headers')
  public headers(ctx: Daruk.Context) {
    ctx.body = 'bar';
  }

  @get('/wildcard_(\\d)_(\\d).htm')
  public deatil(ctx: Daruk.Context) {
    ctx.body = {
      foo: 1
    };
  }

  @middleware('routeMiddleware')
  @get('/middleware')
  public async middleware(ctx: Daruk.Context, next: Function) {}

  @middleware('multiRouteMiddleware')
  @middleware('routeMiddleware')
  @get('/multiMiddleware')
  public async multiMiddleware(ctx: Daruk.Context, next: Function) {}
}
