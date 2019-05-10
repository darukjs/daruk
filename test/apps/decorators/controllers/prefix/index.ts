import { BaseController, get, prefix } from '../../../../../src';
import { Daruk } from '../../../../../src/typings/daruk';

@prefix('/v1')
export default class PrefixIndex extends BaseController {
  @get('/index')
  public async test(ctx: Daruk.Context, next: Function) {
    ctx.body = '';
  }
}
