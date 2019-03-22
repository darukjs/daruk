import { Daruk } from '../../../../src/typings/daruk';

export default function () {
  return (ctx: Daruk.Context, next: Function) => {
    ctx.body = ctx.body + ' multiRouteMiddleware';
    return next();
  };
}