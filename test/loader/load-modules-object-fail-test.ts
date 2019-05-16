import chai = require('chai');
import { Daruk } from '../../src';
import { getApp } from '../utils';

const assert = chai.assert;

describe('load modules.object.fail', () => {
  let app: Daruk;
  it('should throw error', () => {
    assert.throws(() => {
      app = getApp('load-modules-object-fail');
    }, /utils must export a function or object in path/);
  });
});
