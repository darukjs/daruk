import { BaseController, get } from '../../../../../src';

export default class NestIndex extends BaseController {
  @get('/')
  public async index(ctx: any, next: Function) {
    ctx.body = '';
  }
}
