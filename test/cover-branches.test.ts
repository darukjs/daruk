/**
 * @fileOverview 覆盖一般测试不能覆盖的分支语句
 */

import chai = require('chai');
import sinon = require('sinon');
import { Daruk } from '../src';
import { getApp } from './utils';

const port = 3000;
const assert = chai.assert;

describe('cover-branches', () => {
  let daruk: Daruk;
  let stubExit: sinon.SinonStub;

  before((done) => {
    daruk = getApp('cover-branches');

    // 匿名中间件的情况
    daruk.app.use((ctx: any, next: Function) => {
      return next();
    });
    // 传递 host 的情况
    daruk.listen(port, '127.0.0.1', done);

    stubExit = sinon.stub(process, 'exit');
  });

  after((done) => {
    stubExit.restore();
    daruk.httpServer.close(done);
  });

  it('should call prettyLog with error level when Koa error', () => {
    let prettyLogLevel = '';
    const stubPrettyLog = sinon
      .stub(daruk, 'prettyLog')
      .callsFake((msg, options = { level: 'info' }) => {
        prettyLogLevel = options.level;
      });

    const err = new Error('mockError');
    // stack 置为空，才能走到 error.stack 不存在的分支
    err.stack = '';
    daruk.app.emit('error', err);
    // 应该调用 prettyLog 打印错误日志
    assert(prettyLogLevel === 'error');
    stubPrettyLog.restore();
  });

  it('should call default exit hook', (done) => {
    const stubPrettyLog = sinon.stub(daruk, 'prettyLog');
    const err = new Error('mockError');
    // stack 置为空，才能走到 error.stack 不存在的分支
    err.stack = '';

    // 手动调用报错函数
    // 从而执行进程退出回调
    process.listeners('uncaughtException')[1](err);

    const delay = 200;
    // 由于时机问题，延迟判断
    setTimeout(() => {
      // 应该调用 prettyLog 3 次
      assert(stubPrettyLog.callCount === 3);
      stubPrettyLog.restore();
      done();
    }, delay);
  });

  // debug 模式下输出高亮日志
  it('should use debugLog in debug mode', () => {
    const stubConsole = sinon.stub(console, 'log');

    daruk.options.debug = true;
    daruk.prettyLog('msg');
    // 因为 app.logger 被禁用了
    // 只有 src/utils/debugLog 的调用才会导致 console 的调用
    assert(stubConsole.callCount === 1);
    stubConsole.restore();
  });

  it('daruk options', () => {
    // 强行走 timer 不存在的分支语句
    const cb = (daruk: Daruk) => {
      daruk.module.timer = undefined;
    };
    daruk.on('timerLoaded', cb);
    // 劫持 console，避免 debug: true 输出日志
    const stubConsole = sinon.stub(console, 'log');
    getApp('', {
      // rootPath 没有传的情况
      rootPath: undefined,
      // 初始化时 debug 为 true 的情况
      debug: true
    });
    stubConsole.restore();
    daruk.removeListener('timerLoaded', cb);
  });
});
