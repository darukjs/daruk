export default function() {
  return (ctx: any, next: Function) => {
    ctx.body += ';folderMiddleware';
    return next();
  };
}
