import ExitHook = require('daruk-exit-hook');
import KoaLogger = require('daruk-logger');
import Koa = require('koa');
import { Options, PartialOptions } from '../../types/daruk_options';
import DarukPlugin from '../core/plugin';
import Http = require('http');
import Https = require('https');
import { EventEmitter } from 'events';

export interface DarukCore extends EventEmitter {
  plugin: typeof DarukPlugin;
  name: string;
  module: {
    [key: string]: any;
  };
  options: Options;
  httpServer: Http.Server | Https.Server;
  app: Koa;
  logger: KoaLogger.logger;
  mockContext: (req?: {}) => any;
  prettyLog: (msg: string, ext?: { type?: string; level?: string; init?: boolean }) => void;
  serverReady: (server: Http.Server | Https.Server) => void;
  listen: (...args: any[]) => Promise<Http.Server | Https.Server>;
  mergeModule: (type: string, mergeObj: { [key: string]: any }) => void;
  logModuleMsg: (type: string, moduleObj: any) => void;
  setModule: (type: string, key: string, value: any) => void;
  setArrayModule: (type: string, arr: []) => void;
}
