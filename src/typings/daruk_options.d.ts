import koaBody = require('koa-body');
import koa from 'koa';
import { DarukContext } from '../';

type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
    ? RecursivePartial<T[P]>
    : T[P];
};

interface ErrorOptions {
  all: (err: Error, ctx: koa.Context) => void;
  html: (err: Error, ctx: koa.Context) => void;
  json: (err: Error, ctx: koa.Context) => void;
  jsonp: (err: Error, ctx: koa.Context) => void;
  redirect: (err: Error, ctx: koa.Context) => void;
}

export interface Options {
  middlewareOrder: string[];
  name: string;
  rootPath: string;
  debug: boolean;
  bodyOptions: koaBody.IKoaBodyOptions;
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
  notFound?: (status: number, ctx: DarukContext) => {};
}

export type PartialOptions = RecursivePartial<Options>;
