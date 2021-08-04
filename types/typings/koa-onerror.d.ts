declare module 'koa-onerror' {
  import koa from 'koa';
  interface DarukRequest extends koa.Request {
    id: string;
  }
  interface DarukContext extends koa.Context {
    [key: string]: any;
    request: DarukRequest;
  }
  interface Options {
    all?: (err: Error, ctx: DarukContext) => void;
    html?: (err: Error, ctx: DarukContext) => void;
    json?: (err: Error, ctx: DarukContext) => void;
    text?: (err: Error, ctx: DarukContext) => void;
    jsonp?: (err: Error, ctx: DarukContext) => void;
    redirect?: (err: Error, ctx: DarukContext) => void;
  }
  function onerror(app: koa, options: Options | undefined): void;
  export = onerror;
}
