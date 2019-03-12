/**
 * @fileOverview 初始化 ctx.service 的中间件
 */

import HelpContextClass from '../../core/help_context_class';
import { Daruk } from '../../typings/daruk';

export default function() {
  return async function DarukContextLoader(ctx: Daruk.Context, next: Function) {
    ctx.service = new HelpContextClass(ctx);
    await next();
    ctx.service._destroy();
  };
}
