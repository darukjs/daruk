import { BaseController, Context, get } from 'daruk';

export default class Index extends BaseController {
  @get('/')
  public index(ctx: Context, next: Function) {
    ctx.body = 'hello world';
  }
}
