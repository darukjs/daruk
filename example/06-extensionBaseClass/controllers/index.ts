import { Context, get } from 'daruk';
import BaseController from '../libs/controller.base';

export default class Index extends BaseController {
  @get('/')
  public index(ctx: Context, next: Function) {
    let status = 200;
    ctx.body = this.formatJSON('hello world', status);
  }
}
