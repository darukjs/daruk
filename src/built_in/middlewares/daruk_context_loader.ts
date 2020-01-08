/**
 * @fileOverview 初始化 ctx.service 的中间件
 */

import Daruk from '../../core/daruk';
import HelpContextClass from '../../core/help_context_class';

export default function(daruk: Daruk) {
  return async function DarukContextLoader(ctx: any, next: Function) {
    ctx.module.service = new HelpContextClass(ctx, daruk);
    await next();
    ctx.module.service._destroy();
  };
}
