import chai = require('chai');
import sinon = require('sinon');
import { Daruk } from '../src';
import { getApp } from './utils';

const assert = chai.assert;

describe('apis', () => {
  let app: Daruk;
  let ctx: Daruk['app']['context'];
  let stubExit: sinon.SinonStub;

  before(() => {
    app = getApp('apis');
    ctx = app.mockContext();
    stubExit = sinon.stub(process, 'exit');
  });

  after(() => {
    stubExit.restore();
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

  it('listen string port', (done) => {
    app.listen('3000', '127.0.0.1', () => {
      app.httpServer.close(done);
    });
  });

  it('listen args with port, host, cb', (done) => {
    let port = 3000;
    app.listen(port, '127.0.0.1', () => {
      app.httpServer.close(done);
    });
  });
});
