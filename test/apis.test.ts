import chai = require('chai');
import sinon = require('sinon');
import { DarukServer } from '../src';

const assert = chai.assert;

describe('apis', () => {
  let stubExit: sinon.SinonStub;
  let server = DarukServer();

  before(async () => {
    // @ts-ignore
    stubExit = sinon.stub(process, 'exit');
    await server.binding();
  });

  after(() => {
    stubExit.restore();
  });

  it('mockContext', () => {
    const host = '10.22.22.3';
    const context1 = server.mockContext({
      headers: {
        host
      }
    });
    assert(context1.host === host);
    const context2 = server.mockContext();
    assert(context2.host === '127.0.0.1');
  });

  it('listen args with port, host, cb', (done) => {
    let port = 3000;
    server.listen(port, '127.0.0.1', () => {
      server.httpServer.close(done);
    });
  });
});
