import { BaseController, get } from '../../../../src';
import { Daruk } from '../../../../src/typings/daruk';

export default class Index extends BaseController {
  @get('/')
  public async index(ctx: Daruk.Context, next: Function) {
  }
  public _destroy () {
    this.ctx.body = '_destroyed';
  }
}
