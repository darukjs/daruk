import chai = require('chai');
import sinon = require('sinon');
import request = require('supertest');
import { Daruk } from '../../src';
import { getApp } from '../utils';

const assert = chai.assert;
const port = 3000;
const code200 = 200;

describe('http-server-shutdown', () => {
  let app: Daruk;
  let server: Daruk['httpServer'];
  let stub: sinon.SinonStub;
  before((done) => {
    app = getApp('http-server-shutdown', {
      gracefulShutdown: {
        enable: true
      }
    });
    app.listen(port, done);
    server = app.httpServer;
    // 因为 daruk-exit-hook 监听到退出信号或者退出事件时，会执行进程退出的回调然后再执行 process.exit
    // 但我们的测试中肯定是不希望真正的退出的，因此需要劫持 process.ext
    // 劫持 process.exit()
    stub = sinon.stub(process, 'exit');
  });
  after(() => {
    // http-server-shutdown 会自动关闭 server，因此这里不需要关闭
    // app.httpServer.close(done);
    // 还原 process.exit()
    stub.restore();
  });

  it('graceful shutdown', (done) => {
    request(server)
      .get('/')
      .expect(code200)
      .expect('delay route', () => {
        // graceful shutdown 后，服务器应该处于关闭状态
        assert(server.listening === false);
        done();
      });
    // 因为 request 发出请求有一定的延时
    // 如果执行关机回调，http-server-shutdown 会立即获取服务器的 tcp 连接数，会得到 0
    // 因此延迟 500ms 触发关机，从而可以得到正确的连接数
    const timeout = 500;
    setTimeout(() => {
      // 执行进程退出的回调
      process.listeners('exit')[0](0);
    }, timeout);
  });
  it('mock error: graceful shutdown', (done) => {
    // @ts-ignore
    // 强制让 daruk-exit-hook 能够执行两次进程退出的回调
    app.exitHook.called = false;
    const stubErrorLog = sinon.stub(app.logger, 'error');
    // 上面的测试用例已经关闭了 server
    // 再次执行关机回调时，http-server-shutdown 会再次执行 httpServer.close()
    // 从而会报错，进入报错回调
    process.listeners('exit')[0](0);

    // httpServer.close 是异步操作，这里延时判断
    const timeout = 200;
    setTimeout(() => {
      // 如果进入错误回调，应该调用 daruk.logger.error
      assert(stubErrorLog.callCount === 1, 'should call daruk.logger.error');
      stubErrorLog.restore();
      done();
    }, timeout);
  });
});
