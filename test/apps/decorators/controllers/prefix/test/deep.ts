import { BaseController, get, prefix } from '../../../../../../src';
import { Daruk } from '../../../../../../src/typings/daruk';

@prefix('/v1')
export default class PrefixTestDeep extends BaseController {
  @get('/json')
  public async json(ctx: Daruk.Context, next: Function) {
    ctx.body = { foo: 1 };
  }
}
