/**
 * @fileOverview request id 中间件
 */

import { xRequestId } from 'daruk-request-id';
import { injectable } from 'inversify';
import Daruk from '../../core/daruk';
import { defineMiddleware } from '../../decorators';
import { MiddlewareClass } from '../../typings/daruk';

@defineMiddleware('daruk_request_id')
@injectable()
class DarukRquestId implements MiddlewareClass {
  public initMiddleware(daruk: Daruk) {
    return xRequestId(daruk.options.requestId, daruk.app);
  }
}
