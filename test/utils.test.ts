import chai = require('chai');
import sinon = require('sinon');
import { debugLog, isJsTsFile } from '../src/utils';

const assert = chai.assert;

describe('utils', () => {
  it('highlight console', () => {
    const stub = sinon.stub(console, 'log');

    const msg = 'msg';
    debugLog(msg);
    debugLog(msg, 'warn');
    debugLog(msg, 'error');

    assert(stub.callCount === 3);
    stub.restore();
  });
  it('isJsTsFile', () => {
    assert(isJsTsFile('.js') === true);
    assert(isJsTsFile('.ts') === true);
    assert(isJsTsFile('foo.ts') === true);
    assert(isJsTsFile('foo.js') === true);
    assert(isJsTsFile('foo') === false);
  });
});
