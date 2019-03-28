import chai = require('chai');
import sinon = require('sinon');
import { Daruk } from '../../src';
import { getApp } from '../utils';

const assert = chai.assert;
const port = 3000;

let mailContent = '';
// 自定义 transport
// https://nodemailer.com/plugins/create/#transports
const myTransport = {
  name: 'myTransport',
  version: '0.1.0',
  send: (mail: any, callback: Function) => {
    mailContent = mail.message.content;
    callback(null, true);
  },
  verify (callback: Function) {
    callback(null, true);
  }
};

describe('shutdown-notify', () => {
  let app: Daruk;
  let stub:sinon.SinonStub;

  before((done) => {
    app = getApp('', {
      alertAccounts: ['test'],
      nodemailer: myTransport
    });
    app.run(port, done);
    // 劫持 process.exit()
    stub = sinon.stub(process, 'exit');
  });
  after((done) => {
    app.httpServer.close(done);
    // 还原 process.exit()
    stub.restore();
  });

  it('should send email', (done) => {
    const errMsg = 'mockError';
    const timeout = 500;

    // 手动调用进程报错的回调
    // uncaughtException 的回调中会执行 process.exit()
    // 因此上面需要劫持 process.exit
    process.listeners('uncaughtException')[1](new Error(errMsg));
    // 发邮件是一个异步过程，等待 500ms 再判断
    setTimeout(() => {
      // 邮件内容必须包含报错信息
      assert(mailContent.indexOf(errMsg) > -1, 'should mail content contain error message');
      done();
    }, timeout);
  });
});
