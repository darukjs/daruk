import Http = require('http');
import Https = require('https');
import Koa = require('koa');
import Module from './module';

export default class Server extends Module {
  public name: string;
  public app: Koa;
  public httpServer: Http.Server | Https.Server;

  /**
   * @desc 启动服务
   */
  public async listen(...args: any[]): Promise<Http.Server> {
    this.httpServer = this.app.listen(...args);
    this.emit('ready');
    return this.httpServer;
  }
}
