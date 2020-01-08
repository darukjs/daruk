export default function() {
  return (options: any) => {
    return (ctx: any, next: Function) => {
      ctx.body = ctx.body + ' multiRouteMiddleware';
      return next();
    };
  };
}
