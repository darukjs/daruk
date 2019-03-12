import { BaseController, get } from '../../../../src';
import { Daruk } from '../../../../src/typings/daruk';

export default class TestService extends BaseController {
  @get('/')
  public async index(ctx: Daruk.Context, next: Function) {
    ctx.service.testService.testMethod();
  }
  @get('/instantiation')
  public async instantiation(ctx: Daruk.Context, next: Function) {
    // 获取 testService2 三次，但是只实例化一次
    ctx.service.testService2.testMethod();
    ctx.service.testService2.testMethod();
    ctx.service.testService2.testMethod();
  }
}
