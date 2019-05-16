/**
 * @fileOverview 初始化 ctx.service 的中间件
 */

import HelpContextClass from './help_context_class';

export default async function DarukContextLoader(ctx: any, next: Function) {
  ctx.service = new HelpContextClass(ctx);
  await next();
  ctx.service._destroy();
}
