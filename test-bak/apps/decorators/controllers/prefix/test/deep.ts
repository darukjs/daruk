import { BaseController, get, prefix } from '../../../../../../src';

@prefix('/v1')
export default class PrefixTestDeep extends BaseController {
  @get('/json')
  public async json(ctx: any, next: Function) {
    ctx.body = { foo: 1 };
  }
}
