import Http = require('http');
import Https = require('https');
import Koa = require('koa');
import mockHttp from '../mock/http_server';
import HelpContextClass from './help_context_class';
import Module from './module';

export default class Server extends Module {
  public name: string;
  public app: Koa;
  public httpServer: Http.Server | Https.Server;

  /**
   * @desc 模拟 ctx，从而可以从非请求链路中得到 ctx
   * @param {Object, undefined} req - 配置模拟请求的 headers、query、url 等
   * @return Daruk.Context
   */
  public mockContext(req?: {}) {
    const { request, response } = mockHttp(req);
    // 使用 koa 的 createContext 方法创建一个 ctx
    const ctx = this.app.createContext(request, response);
    // 为模拟的 ctx 绑定 service
    ctx.module = this.module;
    ctx.module.service = new HelpContextClass(ctx);
    return ctx;
  }
  /**
   * @desc 启动服务
   */
  public async listen(...args: any[]): Promise<Http.Server> {
    this.httpServer = this.app.listen(...args);
    return this.httpServer;
  }
}
