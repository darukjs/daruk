import chai = require('chai');
import { Daruk } from '../src';
import { getApp } from './utils';

const assert = chai.assert;

describe('apis', () => {
  let app: Daruk;
  let ctx: Daruk['context'];
  before(() => {
    app = getApp('apis');
    ctx = app.mockContext();
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
});