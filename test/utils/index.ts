import path = require('path');
import { Daruk } from '../../src';

export function getRootPath(appName: string) {
  return path.resolve(__dirname, `../apps/${appName}`);
}

let darukInstance: Daruk;

export function getApp(appDir: string, options = {}) {
  const defaultOptions = {
    rootPath: getRootPath(appDir),
    debug: false,
    loggerOptions: {
      disable: true,
      overwriteConsole: false
    }
  };
  // mocha 在单个进程中运行测试用例
  // 为了避免重复监听进程退出事件
  // 每次获取 daruk 都移除上次监听的事件
  if (darukInstance) {
    darukInstance.exitHook.unhookAllEvent();
    darukInstance = null;
  }
  darukInstance = new Daruk('test app', { ...defaultOptions, ...options });
  return darukInstance;
}
