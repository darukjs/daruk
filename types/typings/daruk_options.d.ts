import koaBody = require('koa-body');
import { DarukContext } from '../';

type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
    ? RecursivePartial<T[P]>
    : T[P];
};

interface ErrorOptions {
  all?: (err: Error, ctx: DarukContext) => void;
  html?: (err: Error, ctx: DarukContext) => void;
  text?: (err: Error, ctx: DarukContext) => void;
  json?: (err: Error, ctx: DarukContext) => void;
  jsonp?: (err: Error, ctx: DarukContext) => void;
  redirect?: (err: Error, ctx: DarukContext) => void;
}




export interface Options {
  middlewareOrder: string[];
  name: string;
  rootPath: string;
  debug: boolean;
  bodyOptions: koaBody.IKoaBodyOptions;
  exitHook: boolean;

  // monitor: {
  //   enable: boolean;
  //   v8AnalyticsPath: string;
  //   v8ProfilerPath: string;
  //   auth: {
  //     name: string;
  //     password: string;
  //   };
  // };
  loggerOptions: any;
  customLogger: any;
  loggerMiddleware: {
    filter?: (ctx: DarukContext) => boolean;
    requiredLogs?: string[];
  };
  gracefulShutdown: {
    enable: boolean;
    timeout: number;
  };
  requestId: any;
  validateOptions: {
    translate?: Function;
    validateRoot?: boolean;
    convert?: boolean;
    widelyUndefined?: any;
    error?: boolean;
  };
  [key: string]: any;
  errorOptions?: ErrorOptions | undefined;
  notFound?: (ctx: DarukContext) => void;
}

export type PartialOptions = RecursivePartial<Options>;
