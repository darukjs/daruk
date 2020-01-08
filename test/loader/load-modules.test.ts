import chai = require('chai');
import koa = require('koa');
import { Daruk } from '../../src';
import { getApp } from '../utils';

const assert = chai.assert;

describe('load modules', () => {
  let app: Daruk;
  let ctx: koa.Context;
  before(() => {
    app = getApp('load-modules');
    ctx = app.mockContext();
  });

  it('define file service', () => {
    assert(ctx.module.service.fileService !== undefined);
  });
  it('define folder service', () => {
    assert(ctx.module.service.folderService !== undefined);
  });

  it('define file glue', () => {
    assert(ctx.module.glue.fileGlue !== undefined);
    assert(app.module.glue.fileGlue !== undefined);
  });
  it('define folder glue', () => {
    assert(ctx.module.glue.folderGlue !== undefined);
    assert(app.module.glue.folderGlue !== undefined);
  });

  it('define util', () => {
    assert(ctx.module.util.util1 !== undefined);
    assert(app.module.util.util1 !== undefined);
  });

  it('define project config', () => {
    assert(ctx.module.config.option1 !== undefined);
    assert(app.module.config.option1 !== undefined);
  });
});
