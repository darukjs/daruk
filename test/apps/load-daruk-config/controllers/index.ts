import { BaseController, get, middleware } from '../../../../src';
import { Daruk } from '../../../../src/typings/daruk';

export default class Index extends BaseController {
  @middleware('configMid', 'test')
  @get('/test')
  public async test(ctx: Daruk.Context, next: Function) {
    ctx.body = ctx.body + ';testController';
  }
  @middleware('configMid')
  @get('/testMid')
  public async testMid(ctx: Daruk.Context, next: Function) {
    ctx.body = ctx.body + ';testController2';
  }
}
