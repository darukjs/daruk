import KoaLogger = require('daruk-logger');
import EventEmitter = require('events');
import Http = require('http');
import Https = require('https');
import * as Koa from 'koa';
import * as Router from 'koa-router';
import { Options, PartialOptions } from './daruk_options';

interface RegisterDes {
  name: string;
  export: any;
}

declare module 'daruk' {
  interface Config {
    [key: string]: any;
  }
  interface GlobalModule {
    [key: string]: any;
  }
  interface Util {
    [key: string]: any;
  }
  interface Glue {
    [key: string]: any;
  }
  interface Service {
    [key: string]: any;
  }
  interface Controller {
    [key: string]: any;
  }
  interface Request extends Koa.Request {
    [key: string]: any;
  }
  interface Response extends Koa.Response {
    [key: string]: any;
  }

  type ExtractInterface<T> = { [P in keyof T]: new (ctx: Context) => T[P] };

  export class Daruk extends Koa {
    public name: string;
    public readonly config: Config;
    public readonly globalModule: GlobalModule;
    public readonly util: Util;
    public readonly glue: Glue;
    public readonly httpServer: Http.Server;
    public logger: KoaLogger.logger;
    public options: Options;
    public readonly service: Service;
    public router: Router;
    public readonly module: {
      readonly service: ExtractInterface<Service>;
      readonly controller: ExtractInterface<Controller>;
      readonly globalModule: GlobalModule;
      readonly util: Util;
      readonly glue: Glue;
    };
    public prettyLog: (
      msg: string,
      ext?: { type?: string; level?: string; init?: boolean }
    ) => void;
    public exitHook: {
      addHook: (cb: Function) => void;
    };
    public constructor(name: string, options: PartialOptions);
    public run(port: number | string, host?: string | Function, cb?: Function): Http.Server;
    /**
     * Shorthand for:
     *
     *    http.createServer(app.callback()).listen(...)
     *    copy from Koa
     */
    listen(
        port?: number,
        hostname?: string,
        backlog?: number,
        listeningListener?: () => void,
    ): Http.Server;
    listen(
        port: number,
        hostname?: string,
        listeningListener?: () => void,
    ): Http.Server;
    listen(
        port: number,
        backlog?: number,
        listeningListener?: () => void,
    ): Http.Server;
    listen(port: number, listeningListener?: () => void): Http.Server;
    listen(
        path: string,
        backlog?: number,
        listeningListener?: () => void,
    ): Http.Server;
    listen(path: string, listeningListener?: () => void): Http.Server;
    listen(options: ListenOptions, listeningListener?: () => void): Http.Server;
    listen(
        handle: any,
        backlog?: number,
        listeningListener?: () => void,
    ): Http.Server;
    listen(handle: any, listeningListener?: () => void): Http.Server;



    public serverReady(server: Http.Server | Https.Server): void;
    public registerTimer(describe: RegisterDes | Array<RegisterDes>): void;
    public registerService(describe: RegisterDes | Array<RegisterDes>): void;
    public registerMiddleware(describe: RegisterDes | Array<RegisterDes>): void;
    public registerController(describe: RegisterDes | Array<RegisterDes>): void;
    public registerUtil(describe: RegisterDes | Array<RegisterDes>): void;
    public mockContext(req?: {}): Context;
  }

  /**
   * Copy from Koa
   */
  interface ListenOptions {
        port?: number;
        host?: string;
        backlog?: number;
        path?: string;
        exclusive?: boolean;
        readableAll?: boolean;
        writableAll?: boolean;
    }
  export interface Context extends Koa.Context {
    readonly config: Config;
    readonly globalModule: GlobalModule;
    readonly util: Util;
    readonly glue: Glue;
    readonly service: Service;
    readonly controller: Controller;
  }

  class BaseContext {
    public readonly ctx: Context;
    public readonly app: Daruk;
    public readonly service: Service;
    public constructor(ctx: Context);
  }
  export class BaseController extends BaseContext {}
  export class BaseService extends BaseContext {}

  class DarukEventsClass extends EventEmitter {}
  // @ts-ignore
  export const DarukEvents = new DarukEventsClass();

  type MethodDecoratorFunc = (path: string) => MethodDecorator;
  type JSONDecorator = () => MethodDecorator;
  type PrefixClassDecoratorFunc = (path: string) => ClassDecorator;

  export const post: MethodDecoratorFunc;
  export const get: MethodDecoratorFunc;
  export const del: MethodDecoratorFunc;
  export const put: MethodDecoratorFunc;
  export const patch: MethodDecoratorFunc;
  export const options: MethodDecoratorFunc;
  export const head: MethodDecoratorFunc;
  export const all: MethodDecoratorFunc;

  export const json: JSONDecorator;
  export const JSON: JSONDecorator;
  export const prefix: PrefixClassDecoratorFunc;
  export const redirect: MethodDecoratorFunc;
  export const type: (type: string) => MethodDecorator;
  export const header: (key: string | { [key: string]: string }, value?: string) => MethodDecorator;

  export const middleware: (middlewareName: string) => MethodDecorator;
  export const controller: (prefixPath: string) => ClassDecorator;

  type PropDecoratorFunc = (field?: string) => PropertyDecorator;

  export const config: PropDecoratorFunc;
  export const util: PropDecoratorFunc;
  export const glue: PropDecoratorFunc;
  export const logger: (fileInfo?: string) => PropertyDecorator;
}
