import koaBody = require('koa-body');

type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
    ? RecursivePartial<T[P]>
    : T[P]
};

export interface Options {
  servicePath: string;
  controllerPath: string;
  utilPath: string;
  gluePath: string;
  configPath: string;
  darukConfigPath: string;
  timerPath: string;
  middlewarePath: string;
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
    filter?: () => boolean;
    requiredLogs?: string[];
  };
  gracefulShutdown: {
    enable: boolean;
    timeout: number;
  };
  requestId: any;
  [key: string]: any;
}

export type PartialOptions = RecursivePartial<Options>;
