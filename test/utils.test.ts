import sinon = require('sinon');
import { debugLog } from '../src/utils';

describe('define middleware', () => {
  let stub:sinon.SinonStub;
  before(() => {
    stub = sinon.stub(console, 'log');
  });

  after(() => {
    stub.restore();
  });

  it('should highlight console', () => {
    const msg = 'msg';
    debugLog(msg);
    debugLog(msg, 'warn');
    debugLog(msg, 'error');
  });
});