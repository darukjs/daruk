import { BaseController, get } from '../../../../src';

export default class Index extends BaseController {
  @get('/')
  public async index(ctx: any, next: Function) {
    ctx.body = '';
  }
  @get('/decoratorPath')
  public async decoratorPath(ctx: any, next: Function) {
    ctx.body = '';
  }
}
