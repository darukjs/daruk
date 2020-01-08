// 覆盖类中没有 http handle 的测试用例

import koa = require('koa');
import { BaseController } from '../../../../src';

export default class NoHandle extends BaseController {
  public async index(ctx: koa['context'], next: Function) {
    ctx.body = '';
  }
  public async decoratorPath(ctx: koa['context'], next: Function) {
    ctx.body = '';
  }
}
