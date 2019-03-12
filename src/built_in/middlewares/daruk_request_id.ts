/**
 * @fileOverview request id 中间件
 */

import { Daruk } from '../../typings/daruk';

import koaRequestId = require('daruk-request-id');

export default (app: Daruk.DarukCore) => {
  return koaRequestId(app.options.requestId, app);
};
