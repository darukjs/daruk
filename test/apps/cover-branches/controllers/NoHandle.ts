// 覆盖类中没有 http handle 的测试用例

import { BaseController } from '../../../../src';
import { Daruk } from '../../../../src/typings/daruk';

export default class NoHandle extends BaseController {
  public async index(ctx: Daruk.Context, next: Function) {
    ctx.body = '';
  }
  public async decoratorPath(ctx: Daruk.Context, next: Function) {
    ctx.body = '';
  }
}
