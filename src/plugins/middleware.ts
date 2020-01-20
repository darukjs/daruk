import { injectable } from 'inversify';
import Daruk from '../core/daruk';
import { darukContainer } from '../core/inversify.config';
import { TYPES } from '../core/types';
import { plugin } from '../decorators';
import { middlewareClass, pluginClass } from '../typings/daruk';

@plugin()
@injectable()
class GlobalMiddleware implements pluginClass {
  public async initPlugin(daruk: Daruk) {
    daruk.on('routerUseBefore', () => {
      if (darukContainer.isBound(TYPES.Middleware)) {
        let buildInMiddwareOrder = ['daruk_request_id', 'daruk_logger', 'daruk_body'];
        let middwareOrder = buildInMiddwareOrder.concat(daruk.options.middwareOrder);
        middwareOrder.forEach((midname) => {
          let mid = darukContainer.getNamed<middlewareClass>(TYPES.Middleware, midname);
          let usehandle = mid.initMiddleware(daruk);
          // @ts-ignore
          daruk.app.use(usehandle, midname);
        });
      }
    });
  }
}
