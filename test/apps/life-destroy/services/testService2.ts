import { BaseService } from '../../../../src';
import { DarukCore } from '../../../../src/typings/daruk';

let count = 0;

export default class TestService extends BaseService {
  public constructor(ctx: any, daruk: DarukCore) {
    super(ctx, daruk);
    ctx.body = ++count;
  }
  public testMethod() {}
}
