import { BaseController, get } from '../../../../../src';

export default class NestNestFile extends BaseController {
  @get('/')
  public async index(ctx: any, next: Function) {
    ctx.body = '';
  }
}
