import chai = require('chai');
import sinon = require('sinon');
import { DarukServer } from '../src';

const assert = chai.assert;

describe('apis', () => {
  let stubExit: sinon.SinonStub;
  let server = DarukServer();

  before(async () => {
    stubExit = sinon.stub(process, 'exit');
    server.initOptions({
      rootPath: __dirname,
      debug: false,
      loggerOptions: {
        disable: true,
        overwriteConsole: false
      }
    });
    await server.initPlugin();
  });

  after(() => {
    stubExit.restore();
  });

  it('mockContext', () => {
    const host = '10.22.22.3';
    const context = server.mockContext({
      headers: {
        host
      }
    });
    assert(context.host === host);
  });
  it('listen string port', (done) => {
    server.listen('3000', '127.0.0.1', () => {
      server.httpServer.close(done);
    });
  });

  it('listen args with port, host, cb', (done) => {
    let port = 3000;
    server.listen(port, '127.0.0.1', () => {
      server.httpServer.close(done);
    });
  });
});
