import { BaseController, get } from '../../../../src';

export default class TestService extends BaseController {
  @get('/')
  public async index(ctx: any, next: Function) {
    ctx.service.testService.testMethod();
  }
  @get('/instantiation')
  public async instantiation(ctx: any, next: Function) {
    // 获取 testService2 三次，但是只实例化一次
    ctx.service.testService2.testMethod();
    ctx.service.testService2.testMethod();
    ctx.service.testService2.testMethod();
  }
}
