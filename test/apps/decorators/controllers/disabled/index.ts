import { BaseController, disabled, get } from '../../../../../src';
import { Daruk } from '../../../../../src/typings/daruk';

@disabled()
export default class DisabledIndex extends BaseController {
  @get('/test')
  public async test(ctx: Daruk.Context, next: Function) {
    ctx.body = '';
  }
}
