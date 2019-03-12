import {
  all,
  BaseController,
  del,
  get,
  head,
  middleware,
  options,
  patch,
  post,
  put
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

  @middleware('routeMiddleware')
  @get('/middleware')
  public async middleware(ctx: Daruk.Context, next: Function) {}
}
