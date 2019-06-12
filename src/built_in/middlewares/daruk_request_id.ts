/**
 * @fileOverview request id 中间件
 */

import { xRequestId } from 'daruk-request-id';
import Daruk from '../../core/daruk';

export default (app: Daruk) => {
  return xRequestId(app.options.requestId, app.httpServer);
};
