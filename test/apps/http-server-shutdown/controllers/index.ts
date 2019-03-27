import { BaseController, get } from '../../../../src';
import { Daruk } from '../../../../src/typings/daruk';

export default class Index extends BaseController {
  @get('/')
  public async index(ctx: Daruk.Context, next: Function) {
    // 定义一个 2s 返回的路由
    await new Promise((resolve) => {
      const routeTimeout = 2000;
      setTimeout(() => {
        ctx.body = 'delay route';
        resolve();
      }, routeTimeout);
    });
    next();
  }
}
