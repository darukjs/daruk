/**
 * @fileOverview 覆写 koa.use 方法
 * 从而计算每个中间件的执行耗时
 */

import convertHrtime = require('convert-hrtime');
import { injectable } from 'inversify';
import Daruk from '../core/daruk';
import { plugin } from '../decorators';
import { DarukContext, Next, PluginClass } from '../typings/daruk';

@plugin()
@injectable()
class WrapMiddlewareUse implements PluginClass {
  public async initPlugin(daruk: Daruk) {
    const midNames: string[] = [];
    const WRAP_MIDDLEWARE_USE = 'WRAP_MIDDLEWARE_USE';
    function wrapUse(fn: Function, name: string) {
      let f = async (ctx: DarukContext, next: Next) => {
        enterMid(ctx);
        await fn(ctx, next);
        outMid(ctx);
      };
      Object.defineProperty(f, 'name', { value: name, writable: false });
      return f;
    }

    function enterMid(ctx: DarukContext) {
      let time = getTimeInfo(ctx);
      time.list.push(getHrTime());
    }

    function outMid(ctx: DarukContext) {
      let ns2ms = 1000000;
      let time = getTimeInfo(ctx);
      // 最后进入的中间件，最先出来
      let start = time.list.pop();
      // 当前中间件内部时间减去上一个中间件的时间
      let diff = getHrTime() - start - time.prev;
      time.prev += diff;
      // 更新上个中间件的时间
      time.diff.unshift(diff);
      if (time.list.length === 0) {
        // 所有中间件都被 pop 掉之后，结束所有mid
        let data: { [key: string]: number } = {};
        let sum = 0;
        time.diff.forEach(function summeryTimeConsumption(diff: number, index: number) {
          sum += diff;
          let name = midNames[index];
          if (name === 'router') {
            name = `router:${ctx.request.url}`;
          }
          data[name] = diff / ns2ms;
        });
        data.sum = sum / ns2ms;
        ctx.middleware_perf = data;
        daruk.emit('access', ctx);
      }
    }

    function getTimeInfo(ctx: DarukContext) {
      // 将时间信息保存到 ctx
      let timeInfo = ctx[WRAP_MIDDLEWARE_USE];
      if (!timeInfo) {
        timeInfo = {
          prev: 0,
          list: [],
          diff: []
        };
        ctx[WRAP_MIDDLEWARE_USE] = timeInfo;
      }
      return timeInfo;
    }

    function getHrTime() {
      return convertHrtime(process.hrtime()).nanoseconds;
    }

    function wrapMiddleware(app: Daruk['app']) {
      const use = app.use;
      // @ts-ignore
      app.use = function wrappedKoaUse(fn: Function, name: string) {
        midNames.push(name || 'index_' + midNames.length);
        // @ts-ignore
        return use.call(app, wrapUse(fn, name));
      };
    }

    // wrapMiddlewareUse 计算所有中间件的耗时后，触发 access 事件
    daruk.on('access', function handleAccessLog(ctx) {
      const { access_log, middleware_perf } = ctx;
      middleware_perf.request_id = ctx.id;
      access_log.msg = JSON.stringify(ctx.middleware_perf);
      daruk.logger.access(access_log, ctx);
    });

    wrapMiddleware(daruk.app);
  }
}
