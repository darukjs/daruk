import { BaseController, get } from '../../../../../src';
import { Daruk } from '../../../../../src/typings/daruk';

export default class NestIndex extends BaseController {
  @get('/')
  public async index(ctx: Daruk.Context, next: Function) {
    ctx.body = '';
  }
}
