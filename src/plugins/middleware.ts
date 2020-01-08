import assert = require('assert');
import is = require('is');
import { join } from 'path';
import Daruk from '../core/daruk';
import loader from '../core/loader';
import plugins from '../core/plugin';
import { filterBuiltInModule } from '../utils/filter_built_in_module';

plugins.add('darukMiddleware', (daruk: Daruk) => {
  // 加载内置中间件
  const outsideMiddleware = loader.loadModule('middleware', daruk.options.middlewarePath);
  const buildInMiddleware = loader.loadModule(
    'middleware',
    join(__dirname, '../built_in/middlewares')
  );
  const middleware = { ...buildInMiddleware, ...outsideMiddleware };
  daruk.mergeModule('middleware', middleware);
  daruk.emit('middlewareLoaded', daruk);

  const middlewareOrder = daruk.module.middlewareOrder || [];
  // v8分析相关逻辑已经拆出成一个单独的包，请使用npm install daruk-monitor-middleware 安装
  // // 是否开启了 v8 分析功能
  // if (this.options.monitor.enable) {
  //   middlewareOrder.unshift('daruk_monitor');
  // }
  middlewareOrder.unshift('daruk_request_id', 'daruk_logger', 'daruk_body', 'daruk_context_loader');

  // 再次保存 middlewareOrder，使外部对最终的 middlewareOrder 可见
  daruk.module.middlewareOrder = middlewareOrder;
  // tslint:disable-next-line
  middlewareOrder.forEach(function useMiddleware(name: string) {
    const middleware = daruk.module.middleware[name];
    assert(is.undefined(middleware) === false, `[middleware] ${name} is not found`);
    // 有些中间件是直接修改 koa 实例，不会返回一个函数
    // 因此只 use 函数类型的中间件
    if (is.fn(middleware)) {
      // @ts-ignore
      daruk.app.use(middleware, name);
    }
  });
  daruk.prettyLog(JSON.stringify(filterBuiltInModule('middleware', middlewareOrder)), {
    type: 'middleware',
    init: true
  });
});
