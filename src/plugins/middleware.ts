import { injectable } from 'inversify';
import Daruk from '../core/daruk';
import { darukContainer } from '../core/inversify.config';
import { TYPES } from '../core/types';
import { plugin } from '../decorators';
import { MiddlewareClass, PluginClass } from '../typings/daruk';

@plugin()
@injectable()
class GlobalMiddleware implements PluginClass {
  public async initPlugin(daruk: Daruk) {
    daruk.on('routerUseBefore', () => {
      if (darukContainer.isBound(TYPES.Middleware)) {
        let buildInMiddlewareOrder = [
          'daruk_request_id',
          'daruk_logger',
          'daruk_body',
          'daruk_ctx_class'
        ];
        let middlewareOrder = buildInMiddlewareOrder.concat(daruk.options.middlewareOrder);
        middlewareOrder.forEach((midname) => {
          let mid = darukContainer.getNamed<MiddlewareClass>(TYPES.Middleware, midname);
          let usehandle = mid.initMiddleware(daruk);
          // @ts-ignore
          if (usehandle) daruk.app.use(usehandle, midname);
        });
      }
    });
  }
}
