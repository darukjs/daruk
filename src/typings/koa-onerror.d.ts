declare module 'koa-onerror' {
  import koa from 'koa';
  interface options {
    all?: (err: Error, ctx: koa.Context) => void;
    html?: (err: Error, ctx: koa.Context) => void;
    json?: (err: Error, ctx: koa.Context) => void;
    jsonp?: (err: Error, ctx: koa.Context) => void;
    redirect?: (err: Error, ctx: koa.Context) => void;
  }
  function onerror(app: koa, options: options | undefined): void;
  export = onerror;
}
