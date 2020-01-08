import { BaseController, get, middleware } from '../../../../src';

export default class Index extends BaseController {
  @middleware('configMid', 'test')
  @get('/test')
  public async test(ctx: any, next: Function) {
    ctx.body = ctx.body + ';testController';
  }
  @middleware('configMid')
  @get('/testMid')
  public async testMid(ctx: any, next: Function) {
    ctx.body = ctx.body + ';testController2';
  }
}
