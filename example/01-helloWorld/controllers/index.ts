import { BaseController, get } from '../../../src';
import { Daruk } from '../../../src/typings/daruk';

export default class Index extends BaseController {
  @get('/')
  public index(ctx: Daruk.Context, next: Function) {
    ctx.body = 'hello world';
  }
}
