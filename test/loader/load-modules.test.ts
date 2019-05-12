import chai = require('chai');
import { Daruk } from '../../src';
import { getApp } from '../utils';

const assert = chai.assert;

describe('load modules', () => {
  let app: Daruk;
  let ctx: Daruk['context'];
  before(() => {
    app = getApp('load-modules');
    ctx = app.mockContext();
  });

  it('define file service', () => {
    assert(ctx.service.fileService !== undefined);
  });
  it('define folder service', () => {
    assert(ctx.service.folderService !== undefined);
  });

  it('define file glue', () => {
    assert(ctx.glue.fileGlue !== undefined);
    assert(app.glue.fileGlue !== undefined);
  });
  it('define folder glue', () => {
    assert(ctx.glue.folderGlue !== undefined);
    assert(app.glue.folderGlue !== undefined);
  });

  it('define util', () => {
    assert(ctx.util.util1 !== undefined);
    assert(app.util.util1 !== undefined);
  });

  it('define project config', () => {
    assert(ctx.config.option1 !== undefined);
    assert(app.config.option1 !== undefined);
  });
});
