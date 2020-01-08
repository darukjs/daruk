import is = require('is');
import koa = require('koa');
import Module from './module';

/**
 * @desc 为了实现自动在 service 类的实例中绑定 ctx
 * 需要借助该辅助类先将 ctx 绑定到 ctx.service
 * 也就是 ctx.service 是该类的实例
 * 然后再通过 ctx.service.xxxService 获取用户定义的 service
 */
export default class HelpContextClass {
  private _ctx: any;
  private _serviceCache: any;

  public constructor(ctx: koa['context']) {
    const services = ctx.module.service;
    this._ctx = ctx;
    // 缓存 service 实例
    // 保证在单次请求链路中，service 只会被实例化一次
    this._serviceCache = {};

    // tslint:disable-next-line
    const self = this;
    if (services) {
      Object.keys(services).forEach(function definePropertyForServices(serviceName) {
        Object.defineProperty(self, serviceName, {
          get() {
            if (self._serviceCache[serviceName]) return self._serviceCache[serviceName];
            const serviceInstance = new services[serviceName](self._ctx);
            self._serviceCache[serviceName] = serviceInstance;
            return serviceInstance;
          }
        });
      });
    }
  }
  // 执行清理操作
  public _destroy() {
    const serviceCache = this._serviceCache;
    // 允许用户在 service 的 _destroy 方法中执行清理操作
    Object.keys(serviceCache).forEach(function destroyServiceCache(serviceName) {
      const serviceInstance = serviceCache[serviceName];
      if (is.fn(serviceInstance._destroy)) {
        serviceInstance._destroy();
      }
    });
    this._serviceCache = null;
    this._ctx = null;
  }
}
