import chai = require('chai');
import { Daruk } from '../../src';
import { getApp } from '../utils';

const assert = chai.assert;

describe('daruk-http-server-shutdown', () => {
  let app: Daruk;
  before(() => {
    app = getApp('', {
      gracefulShutdown: {
        enable: true
      }
    });
  });
});