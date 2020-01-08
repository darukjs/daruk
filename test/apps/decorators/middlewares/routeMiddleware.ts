export default function() {
  return (ctx: any, next: Function) => {
    ctx.body = 'routeMiddleware';
    return next();
  };
}
