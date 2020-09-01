/**
 * @fileOverview 辅助 ctx_class 挂载在请求生命周期
 */

import { injectable, interfaces } from 'inversify';
import { Daruk, DarukContext } from '../../';
import { darukContainer } from '../../core/inversify.config';
import { defineMiddleware } from '../../decorators';
import { SERVICE } from '../../decorators/constants';
import { Constructor, MiddlewareClass, Next } from '../../typings/daruk';

@defineMiddleware('daruk_ctx_class')
@injectable()
class DarukCtxClass implements MiddlewareClass {
  public initMiddleware(daruk: Daruk) {
    let services = Reflect.getMetadata(SERVICE, Reflect) || [];
    return async (ctx: DarukContext, next: Next) => {
      services.forEach((target: Constructor) => {
        if (darukContainer.isBound(target.name)) {
          darukContainer
            .rebind<Constructor>(target.name)
            .toDynamicValue((context: interfaces.Context) => {
              let service = new target();
              service.ctx = ctx;
              return service;
            });
        } else {
          darukContainer
            .bind<Constructor>(target.name)
            .toDynamicValue((context: interfaces.Context) => {
              let service = new target();
              service.ctx = ctx;
              return service;
            });
        }
      });
      await next();
    };
  }
}
