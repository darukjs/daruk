import chai = require('chai');
import sinon = require('sinon');
import { Daruk } from '../src';
import { getApp } from './utils';

const assert = chai.assert;

describe('apis', () => {
  let app: Daruk;
  let ctx: Daruk['context'];
  let stubExit: sinon.SinonStub;

  before(() => {
    app = getApp('apis');
    ctx = app.mockContext();
    stubExit = sinon.stub(process, 'exit');
  });

  after(() => {
    stubExit.restore();
  });

  it('registerService', () => {
    assert(ctx.service.testService !== undefined);
  });
  it('registerUtil', () => {
    assert(ctx.util.testUtil !== undefined);
  });
  it('registerGlue', () => {
    assert(ctx.glue.testGlue !== undefined);
  });
  it('registerMiddleware', () => {
    assert(app.module.middleware.testMiddleware !== undefined);
  });
  it('registerTimer', () => {
    assert(app.module.timer.testTimer !== undefined);
  });

  it('mockContext', () => {
    const host = '10.22.22.3';
    const context = app.mockContext({
      headers: {
        host
      }
    });
    assert(context.host === host);
  });

  it('should log error when use change modules', () => {
    assert.throws(() => {
      app.util.testUtil = function changedModule() {

      };
    }, '[daruk error] user could not change module directly\nplease use function\'setModule\'');
  });
});
