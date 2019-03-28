import chai = require('chai');
import sinon = require('sinon');
import { debugLog } from '../src/utils';

describe('utils', () => {
  it('should highlight console', () => {
    const stub = sinon.stub(console, 'log');

    const msg = 'msg';
    debugLog(msg);
    debugLog(msg, 'warn');
    debugLog(msg, 'error');

    chai.assert(stub.callCount === 3);
    stub.restore();
  });
});