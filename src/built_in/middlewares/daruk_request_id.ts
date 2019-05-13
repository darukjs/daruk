/**
 * @fileOverview request id 中间件
 */

import { Daruk } from '../../typings/daruk';
import { xRequestId } from 'daruk-request-id';

export default (app: Daruk.DarukCore) => {
  return xRequestId(app.options.requestId, app);
};
