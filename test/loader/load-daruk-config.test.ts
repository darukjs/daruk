import chai = require('chai');
import request = require('supertest');
import { Daruk } from '../../src';
import { getApp } from '../utils';

const assert = chai.assert;
const port = 3000;
const code200 = 200;

describe('load daruk.config', () => {
  let app: Daruk;
  let server: Daruk['httpServer'];
  let ctx: Daruk['context'];
  before((done) => {
    app = getApp('load-daruk-config');
    app.listen(port, done);
    server = app.httpServer;
    ctx = app.mockContext();
  });

  after((done) => {
    app.httpServer.close(done);
  });

  it('should middleware loaded and execute in order', (done) => {
    request(server)
      .get('/')
      .expect(code200)
      .expect('packetMid;packetMid2;configMid', done);
  });

  it('define util with daruk.config', () => {
    assert(ctx.util.util1 !== undefined);
    assert(app.util.util1 !== undefined);
  });

  it('define global module with daruk.config', () => {
    assert(ctx.globalModule.module1 !== undefined);
    assert(app.globalModule.module1 !== undefined);
  });

  it('define timer with daruk.config', function(done) {
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

describe('load daruk.config.fail', () => {
  it('should throw error when can not load middleware', () => {
    let app: Daruk;
    assert.throws(() => {
      app = getApp('load-daruk-config-fail');
    }, '[daruk.config.middleware] can not find function');
  });
});
