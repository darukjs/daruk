/**
 * @fileOverview 辅助 ctx_class 挂载在请求生命周期
 */

import { injectable } from 'inversify';
import { Daruk, DarukContext } from '../../';
import { darukContainer } from '../../core/inversify.config';
import { defineMiddleware } from '../../decorators';
import { SERVICE } from '../../decorators/constants';
import { Constructor, MiddlewareClass, Next } from '../../typings/daruk';

@defineMiddleware('daruk_ctx_class')
@injectable()
class DarukCtxClass implements MiddlewareClass {
  public initMiddleware(daruk: Daruk) {
    return async (ctx: DarukContext, next: Next) => {
      let services = Reflect.getMetadata(SERVICE, Reflect) || [];
      services.forEach((target: Constructor) => {
        let service = new target();
        service.ctx = ctx;
        darukContainer.bind<Constructor>(target.name).toConstantValue(service);
      });
      await next();
      services.forEach((target: Constructor) => {
        darukContainer.unbind(target.name);
      });
    };
  }
}
