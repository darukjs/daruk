import { BaseController, get, prefix } from '../../../../../src';

@prefix('/v1')
export default class PrefixIndex extends BaseController {
  @get('/index')
  public async test(ctx: any, next: Function) {
    ctx.body = '';
  }
}
