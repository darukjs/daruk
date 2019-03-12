import { BaseService, Daruk } from '../../../../src';

let count = 0;

export default class TestService extends BaseService {
  public constructor (ctx: Daruk['context']) {
    super(ctx);
    ctx.body = ++count;
  }
  public testMethod () {}
}