import decache from 'decache';
import path = require('path');

export function getRootPath(appName: string) {
  return path.resolve(__dirname, `../apps/${appName}`);
}

export function getApp(appDir: string, options = {}, forceUpdateDaruk = false) {
  const DarukClass = getDaruk(forceUpdateDaruk);

  const defaultOptions = {
    rootPath: getRootPath(appDir),
    debug: false,
    loggerOptions: {
      disable: true,
      overwriteConsole: false
    }
  };
  return new DarukClass('test app', { ...defaultOptions, ...options });
}

let Daruk:any;

/**
 * @desc 获取 Daruk class，forceUpdateDaruk === true 时，会舍弃内存中的 Daruk 缓存，重新从文件 require
 * 由于 node.js 的 require 会缓存模块，从而导致多个测试用例共用了内存中的模块，这可能导致问题
 * 比如 daruk-exit-hook 使用了模块内部变量来控制逻辑
 * 在进程退出相关测试用例中，即 http-server-shutdown.test、shutdown-notify.test 之间会互相影响
 * @param Boolean forceUpdateDaruk - 是否强制从文件重新 require Daruk 及其依赖
 * @return Daruk
 */
function getDaruk(forceUpdateDaruk = false) {
  Daruk = Daruk || require('../../src').Daruk;
  // 是否强制舍弃 require 中的 Daruk 缓存
  if (!forceUpdateDaruk) return Daruk;

  // 删除 require 中的 Daruk 缓存（Daruk 依赖的包的缓存也会被删除）
  decache('../../src');
  // daruk-exit-hook 会监听很多进程退出事件，
  // 通过 decache 删除缓存后，会重新执行 daruk-exit-hook，从而在 process 上重复监听相同的事件
  // 所以应该先注销所有重复监听的事件
  const events = ['exit', 'beforeExit', 'SIGHUP', 'SIGINT', 'SIGTERM', 'SIGBREAK', 'message', 'uncaughtException', 'unhandledRejection'];
  events.forEach((event) => {
    process.removeAllListeners(event);
  });
  Daruk = require('../../src').Daruk;
  return Daruk;
}
