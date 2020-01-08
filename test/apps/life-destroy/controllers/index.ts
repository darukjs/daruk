import { BaseController, get } from '../../../../src';

export default class Index extends BaseController {
  @get('/')
  public async index(ctx: any, next: Function) {}
  public _destroy() {
    this.ctx.body = '_destroyed';
  }
}
