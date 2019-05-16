import { BaseController, Context, get, post } from 'daruk';

export default class Index extends BaseController {
  @get('/')
  @post('/')
  public index(ctx: Context, next: Function) {
    ctx.body = 'hello world';
  }
}
