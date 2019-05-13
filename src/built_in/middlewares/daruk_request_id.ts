/**
 * @fileOverview request id 中间件
 */

import { xRequestId } from 'daruk-request-id';
import { Daruk } from '../../typings/daruk';

export default (app: Daruk.DarukCore) => {
  return xRequestId(app.options.requestId, app);
};
