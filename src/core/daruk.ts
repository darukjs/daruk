import KoaLogger = require('daruk-logger');
import { EventEmitter } from 'events';
import Http = require('http');
import Https = require('https');
import is = require('is');
import Koa = require('koa');
import deepAssign = require('object-assign-deep');
import path = require('path');
import { Options, PartialOptions } from '../../types/daruk_options';
import mockHttp from '../mock/http_server';
import { debugLog, getFilePathRecursive, uRequire } from '../utils';
import getDefaultOptions from './daruk_default_options';
import HelpContextClass from './help_context_class';
import DarukPlugin from './plugin';

class Daruk extends EventEmitter {
  public plugin: typeof DarukPlugin;
  public name: string;
  public module: {
    [key: string]: any;
  };
  public options: Options;
  public httpServer: any;
  public logger: KoaLogger.logger;
  public constructor(name: string, options: PartialOptions) {
    super();
    this.name = name;
    const rootPath = options.rootPath || path.dirname(require.main.filename);
    const defaultOptions = getDefaultOptions(rootPath, name, options.debug || false);
    this.options = deepAssign({}, defaultOptions, options);
    const customLogger = options.customLogger;
    // customLogger 可能是一个类，不能进行 deep assign
    delete options.customLogger;
    this.options = deepAssign({}, defaultOptions, options);
    // 还原被 delete 的 customLogger
    this.options.customLogger = options.customLogger = customLogger;

    // 初始化 logger
    this.logger = customLogger || new KoaLogger.logger(this.options.loggerOptions);
    // 用于保存 DarukLoader 加载的模块
    this.module = {};
    if (this.options.serverType === 'koa') {
      this.httpServer = new Koa();
    } else {
      throw new Error('only support koa server Type');
    }
    // 初始化内置插件
    getFilePathRecursive(path.join(__dirname, '../plugins')).forEach((file: string) => {
      uRequire(file);
    });
    this.plugin = DarukPlugin;
    // tslint:disable-next-line
    const self = this;
    // 监听 koa 的错误事件，输出日志
    this.httpServer.on('error', function handleKoaError(err: any) {
      self.prettyLog('[koa error] ' + (err.stack || err.message), { level: 'error' });
    });
  }
  /**
   * @desc 模拟 ctx，从而可以从非请求链路中得到 ctx
   * @param {Object, undefined} req - 配置模拟请求的 headers、query、url 等
   * @return Daruk.Context
   */
  public mockContext(req?: {}) {
    const { request, response } = mockHttp(req);
    // 使用 koa 的 createContext 方法创建一个 ctx
    const ctx = this.httpServer.createContext(request, response);
    // 为模拟的 ctx 绑定 service
    ctx.service = new HelpContextClass(ctx);
    return ctx;
  }
  /**
   * @desc 在开发环境下输出 format 日志
   * 正式环境下仍旧保持纯文本输出
   */
  public prettyLog(msg: string, ext?: { type?: string; level?: string; init?: boolean }) {
    const { type, level, init } = { type: '', level: 'info', init: false, ...ext };
    const prefixInfo = [init ? '[init] ' : '', type ? `[${type}] ` : ' '].join('');
    if (this.options.debug) {
      debugLog(`[${new Date().toLocaleString()}] [debug] ${prefixInfo}${msg}`, level);
    } else {
      this.logger[level](prefixInfo + msg);
    }
  }
  public serverReady(server: Http.Server | Https.Server) {
    this.httpServer = server;
    this.emit('initAfter');
    this.emit('ready', this);
  }
  /**
   * @desc 启动服务
   */
  public listen(...args: any[]): Http.Server {
    // https://github.com/nodejs/node/blob/master/lib/net.js#L182
    let options: {
      path?: string;
      port?: number;
      host?: string;
    } = {};

    const _cb = args[args.length - 1];
    const cb = (...arg1: any) => {
      this.serverReady(this.httpServer);
      if (typeof _cb === 'function') _cb(...arg1);
      this.plugin.run(this);
      this.emit('pluginReady');
      this.prettyLog(
        `${this.name} is starting at http://${options.host ? options.host : 'localhost'}:${
          options.port
        }`
      );
    };

    if (args.length !== 0) {
      const arg0 = args[0];
      if (typeof arg0 === 'object' && arg0 !== null) {
        // (options[...][, cb])
        options = arg0;
      } else if (!this.isPipeName(arg0)) {
        // (path[...][, cb])
        // options.path = arg0;
        // ([port][, host][...][, cb])
        options.port = arg0;
        if (args.length > 1 && typeof args[1] === 'string') {
          options.host = args[1];
        }
      }
      if (typeof _cb === 'function') {
        args[args.length - 1] = cb;
      } else {
        args.push(cb);
      }
    }
    return this.httpServer.listen(...args);
  }
  /**
   * @desc DarukLoader 加载模块后，
   * 将加载的内容合并到 this.module[type]
   */
  public mergeModule(type: string, mergeObj: { [key: string]: any }) {
    if (!is.object(mergeObj)) return;
    if (!this.module[type]) this.module[type] = {};

    Object.keys(mergeObj).forEach((key) => {
      this.setModule(type, key, mergeObj[key]);
    });
  }
  /**
   * @desc 支持合并单个模块到 this.module[type]
   * 供 register 类型的方法使用
   */
  public setModule(type: string, key: string, value: any) {
    if (!this.module[type]) this.module[type] = {};
    this.module[type][key] = value;
  }
  /**
   * @desc 保存数据类型的模块到 this.module[type]
   * 主要是针对 middlewareOrder
   */
  public setArrayModule(type: string, arr: []) {
    this.module[type] = arr;
  }
  // https://github.com/nodejs/node/blob/master/lib/net.js#L1117
  private toNumber(x: any) {
    // tslint:disable-next-line:no-conditional-assignment
    return Number(x) >= 0;
  }

  // https://github.com/nodejs/node/blob/master/lib/net.js#L137
  private isPipeName(s: any) {
    return typeof s === 'string' && this.toNumber(s) === false;
  }
}

let app = new Daruk('test', {
  rootPath: __dirname,
  debug: true
});
let port = 1212;
app.listen(port);

export default Daruk;
