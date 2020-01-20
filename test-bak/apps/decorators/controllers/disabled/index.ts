import { BaseController, disabled, get } from '../../../../../src';

@disabled()
export default class DisabledIndex extends BaseController {
  @get('/test')
  public async test(ctx: any, next: Function) {
    ctx.body = '';
  }
}
