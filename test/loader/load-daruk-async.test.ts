import chai = require('chai');
import { Daruk } from '../../src';
import { getApp } from '../utils';

const assert = chai.assert;

describe('load daruk.async', () => {
  let app: Daruk;
  before(() => {
    app = getApp('load-daruk-glues-async');
  });

  it('should run async function success', async () => {
    assert.equal(await app.glue.connection, 'promise');
  });
});
