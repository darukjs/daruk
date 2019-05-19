// import * as daruk from "./build/index";
import ExitHook = require('daruk-exit-hook');
import KoaLogger = require('daruk-logger');
import Http = require('http');
import Koa = require('koa');
import { Options } from '../../types/daruk_options';

export namespace Daruk {
  export interface Context extends Koa.Context {
    config: any;
    globalModule: any;
    util: any;
    glue: any;
    service: any;
    controller: any;
    app: DarukCore;
    parseBody?: {
      [key: string]: ParsedType;
    };
    parseQuery?: {
      [key: string]: ParsedType;
    };
    parseParams?: {
      [key: string]: ParsedType;
    };
    validateRequired?: undefined | { [key: string]: string };
    validateError?: Array<string>;
  }

  export interface DarukCore extends Koa {
    config: any;
    module: any;
    name: string;
    // 只能声明为 any 才能覆写了 koa 的 use
    use: any;
    context: Context;
    options: Options;
    prettyLog: (msg: string, ext?: { type?: string; level?: string; init?: boolean }) => void;
    mergeModule: (type: string, mergeModule: any) => void;
    setArrayModule: (type: string, arr: []) => void;
    logger: KoaLogger.logger;
    exitHook: ExitHook;
    httpServer: Http.Server;
    glue: {
      daruk_nodemailer: any;
      daruk_sina_watch: any;
    };
  }
  export interface RegisterDes {
    name: string;
    export: any;
  }
  export interface ParseType {
    [key: string]:
      | ArrayConstructor
      | BooleanConstructor
      | StringConstructor
      | NumberConstructor
      | ObjectConstructor;
  }
  export interface ParsedType {
    [key: string]:
      | Array<string>
      | Boolean
      | String
      | Number
      | Object;
  }
  export type method = 'body' | 'query' | 'params';
  export type validateFunc = (value: string) => string | undefined;
}
