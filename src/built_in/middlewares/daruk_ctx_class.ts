/**
 * @fileOverview 辅助 ctx_class 挂载在请求生命周期
 */

import { Container } from 'inversify';
import { Daruk, darukContainer, DarukContext } from '../../';
import { defineMiddleware } from '../../decorators';
import { MiddlewareClass, Next } from '../../typings/daruk';

@defineMiddleware('daruk_ctx_class')
class DarukCtxClass implements MiddlewareClass {
  public initMiddleware(_daruk: Daruk) {
    return async (ctx: DarukContext, next: Next) => {
      let requestContainer = new Container({ skipBaseClassChecks: true });
      requestContainer.parent = darukContainer;
      requestContainer.bind<DarukContext>('ctx').toConstantValue(ctx);
      requestContainer.bind<Daruk>('Daruk').toConstantValue(_daruk);
      ctx.requestContainer = requestContainer;
      await next();
    };
  }
}
