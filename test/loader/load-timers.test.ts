import chai = require('chai');
import { Daruk } from '../../src';
import { getApp } from '../utils';

const assert = chai.assert;

describe('define timer', () => {
  let app: Daruk;
  before(() => {
    app = getApp('load-timers');
  });

  it('should timer be completed', function(done) {
    const timerDelay = 5000;
    const timeOut = 1200;
    // tslint:disable-next-line
    this.timeout(timerDelay);
    setTimeout(() => {
      // @ts-ignore
      assert(app.timerComplete === true);
      done();
    }, timeOut);
  });
});
