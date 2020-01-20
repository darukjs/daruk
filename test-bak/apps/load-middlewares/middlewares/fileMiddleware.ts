export default function() {
  return (ctx: any, next: Function) => {
    ctx.body = 'fileMiddleware';
    return next();
  };
}
