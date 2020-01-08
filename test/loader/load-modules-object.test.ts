import chai = require('chai');
import koa = require('koa');
import { Daruk } from '../../src';
import { getApp } from '../utils';

const assert = chai.assert;

describe('load modules.object', () => {
  let app: Daruk;
  let ctx: koa.Context;
  before(() => {
    app = getApp('load-modules-object');
    ctx = app.mockContext();
  });

  it('define func', () => {
    assert.equal(app.module.util.func(), 'func');
    assert.equal(ctx.module.util.func(), 'func');
  });

  it('define num', () => {
    assert.equal(app.module.config.num, 1);
    assert.equal(ctx.module.config.num, 1);
  });

  it('define foo', () => {
    assert.equal(app.module.config.foo(), 'foo');
    assert.equal(ctx.module.config.foo(), 'foo');
  });
});
