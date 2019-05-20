import chai = require('chai');
import path = require('path');
import sinon = require('sinon');
import { debugLog, isJsTsFile, isSubClass, uRequire } from '../src/utils';

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
  it('uRequire', () => {
    // 支持 common.js 和 es module
    assert(uRequire('path') !== undefined);
    assert(uRequire(path.resolve(__dirname, '../src/core/daruk_core.ts')) !== undefined);
  });
  it('isSubClass', () => {
    class A {}
    class B extends A {}
    class C {}
    assert(isSubClass(B, A) === true);
    assert(isSubClass(B, C) === false);
  });
  it('isJsTsFile', () => {
    assert(isJsTsFile('.js') === true);
    assert(isJsTsFile('.ts') === true);
    assert(isJsTsFile('foo.ts') === true);
    assert(isJsTsFile('foo.js') === true);
    assert(isJsTsFile('foo') === false);
  });
});
