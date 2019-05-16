import chai = require('chai');
import { Daruk } from '../../src';
import { getApp } from '../utils';

const assert = chai.assert;

describe('load modules.object', () => {
  let app: Daruk;
  let ctx: Daruk['context'];
  before(() => {
    app = getApp('load-modules-object');
    ctx = app.mockContext();
  });

  it('define func', () => {
    assert.equal(app.util.func(), 'func');
    assert.equal(ctx.util.func(), 'func');
  });

  it('define num', () => {
    assert.equal(app.config.num, 1);
    assert.equal(ctx.config.num, 1);
  });

  it('define foo', () => {
    assert.equal(app.config.foo(), 'foo');
    assert.equal(ctx.config.foo(), 'foo');
  });
});
