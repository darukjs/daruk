/**
 * @fileOverview request id 中间件
 */

import { xRequestId } from 'daruk-request-id';
import Daruk from '../../core/daruk';

export default (daruk: Daruk) => {
  return xRequestId(daruk.options.requestId, daruk.app);
};
