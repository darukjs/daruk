import path = require('path');
import { Daruk } from '../../src';

export function getRootPath (appName: string) {
  return path.resolve(__dirname, `../apps/${appName}`);
}

export function getApp (appName: string, options = {}) {
  const defaultOptions = {
    alertAccounts: ['test'],
    rootPath: getRootPath(appName),
    debug: false,
    loggerOptions: {
      disable: true,
      overwriteConsole: false
    }
  };
  return new Daruk('test app', { ...defaultOptions, ...options });
}