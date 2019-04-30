import { Context, Daruk } from 'daruk';

export default function(daruk: Daruk) {
  return async (ctx: Context, next: Function) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    await next();
  };
}
