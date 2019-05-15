/**
 * @fileOverview Daruk 核心类
 */

import ExitHook = require('daruk-exit-hook');
import KoaLogger = require('daruk-logger');
import Http = require('http');
import Https = require('https');
import is = require('is');
import Koa = require('koa');
import Router = require('koa-router');
import deepAssign = require('object-assign-deep');
import path = require('path');
import { Options, PartialOptions } from '../../types/daruk_options';
import helpDecoratorClass from '../decorators/help_decorator_class';
import mockHttp from '../mock/http_server';
import { Daruk } from '../typings/daruk';
import { debugLog, deepDefineProperty, SimpleMixin } from '../utils';
import getDefaultOptions from './daruk_default_options';
import Events from './daruk_event';
import DarukInitModule from './daruk_init_module';
import HelpContextClass from './help_context_class';
import wrapMiddlewareUse from './wrap_middleware_use';

/**
 * @desc daruk 核心类
 * 用 DarukInitModule 类注入
 */
@SimpleMixin(DarukInitModule)
class DarukCore extends Koa {
  public name: string;
  public options: Options;
  public logger: KoaLogger.logger;
  public router: Router;
  public use: any;
  public exitHook: ExitHook;
  public loader: KoaLogger.logger;
  public module: any;
  public config: any;
  public globalModule: any;
  public util: any;
  public glue: any;
  public context: Daruk.Context;
  public httpServer: any;
  // 覆写 koa 的 createContext 方法声明
  public createContext: (req: any, res: any) => Daruk.Context;
  public initEnv: () => void;
  /**
   * @desc 构造函数
   * @param {string} name - app 名字，会用于日志输出、邮件报警等
   * @param {PartialOptions} options - 项目配置
   */
  public constructor(name: string, options: PartialOptions) {
    super();
    this.name = name;
    // 保证 context.app 是 daruk 而不是 koa
    this.context.app = this;
    // 获取 DarukLoader 加载模块的根目录
    const rootPath = options.rootPath || path.dirname(require.main.filename);
    // defaultOptions 由 rootPath、debug、name 确定
    const defaultOptions = getDefaultOptions(rootPath, name, options.debug || false);

    const customLogger = options.customLogger;
    // customLogger 可能是一个类，不能进行 deep assign
    delete options.customLogger;
    this.options = deepAssign({}, defaultOptions, options);
    // 还原被 delete 的 customLogger
    this.options.customLogger = options.customLogger = customLogger;

    // 初始化 logger
    this.logger = customLogger || new KoaLogger.logger(this.options.loggerOptions);

    // 初始化装饰器与 daurk 实例之间的桥梁
    helpDecoratorClass.init(this);

    // 用于保存 DarukLoader 加载的模块
    this.module = {};
    this.initExitHook();
    wrapMiddlewareUse(this);

    // tslint:disable-next-line
    const self = this;
    // wrapMiddlewareUse 计算所有中间件的耗时后，触发 access 事件
    Events.on('access', function handleAccessLog(ctx) {
      const { access_log, middleware_perf } = ctx;
      middleware_perf.request_id = ctx.id;
      access_log.msg = JSON.stringify(ctx.middleware_perf);
      self.logger.access(access_log, ctx);
    });
    // 监听 koa 的错误事件，输出日志
    this.on('error', function handleKoaError(err) {
      self.prettyLog('[koa error] ' + (err.stack || err.message), { level: 'error' });
    });
    this.router = new Router();
    this.initEnv();
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
    deepDefineProperty(this.module[type], key, value);
  }
  /**
   * @desc 保存数据类型的模块到 this.module[type]
   * 主要是针对 middlewareOrder
   */
  public setArrayModule(type: string, arr: []) {
    this.module[type] = arr;
  }
  /**
   * @desc 支持编程式地向 daruk 注入模块，
   * 而不依赖目录约定。是后续 register 类型方法的基础方法
   */
  public register(type: string, descriptions: Daruk.RegisterDes | Array<Daruk.RegisterDes>) {
    const descs = Array.isArray(descriptions) ? descriptions : [descriptions];
    descs.forEach((desc) => {
      this.setModule(type, desc.name, desc.export);
    });
  }
  /**
   * @desc 注入 service
   */
  public registerService(des: Daruk.RegisterDes | Array<Daruk.RegisterDes>) {
    this.register('service', des);
  }
  /**
   * @desc 注入 glue
   */
  public registerGlue(des: Daruk.RegisterDes | Array<Daruk.RegisterDes>) {
    this.register('glue', des);
  }
  /**
   * @desc 注入 middleware
   */
  public registerMiddleware(des: Daruk.RegisterDes | Array<Daruk.RegisterDes>) {
    this.register('middleware', des);
  }
  /**
   * @desc 注入定时器
   */
  public registerTimer(des: Daruk.RegisterDes | Array<Daruk.RegisterDes>) {
    this.register('timer', des);
  }
  /**
   * @desc 注入 util
   */
  public registerUtil(des: Daruk.RegisterDes | Array<Daruk.RegisterDes>) {
    this.register('util', des);
  }
  /**
   * @desc 模拟 ctx，从而可以从非请求链路中得到 ctx
   * @param {Object, undefined} req - 配置模拟请求的 headers、query、url 等
   * @return Daruk.Context
   */
  public mockContext(req?: {}) {
    const { request, response } = mockHttp(req);
    // 使用 koa 的 createContext 方法创建一个 ctx
    const ctx = this.createContext(request, response);
    // 为模拟的 ctx 绑定 service
    ctx.service = new HelpContextClass(ctx);
    return ctx;
  }
  /**
   * @desc 启动服务
   */
  public listen(...args: any[]): Http.Server {
    // https://github.com/nodejs/node/blob/master/lib/net.js#L182
    let arr: any;
    let options: {
      path?: string;
      port?: number;
      host?: string;
    } = {};

    const _cb = args[args.length - 1];
    const cb = (...arg1: any) => {
      this.serverReady(this.httpServer);
      if (typeof _cb === 'function') _cb(...arg1);
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
    this.httpServer = super.listen(...args);
    return this.httpServer;
  }
  public run(port: number, host?: string | Function, cb?: Function) {
    let _cb: any = cb;
    let _host: any = host;
    if (is.fn(host)) {
      _cb = host;
      _host = undefined;
    }
    return this.listen(port, _host, _cb);
  }

  /**
   * @desc 服务启动后的需要完成的剩余工作
   * 如果不使用listen  方法启动，而是自定义启动（比如启动 https 服务）
   * 需要在启动后的回调中调用该函数
   */
  public serverReady(server: Http.Server | Https.Server) {
    this.httpServer = server;
    this.initAfter();
    this.emit('ready', this);
  }
  /**
   * @desc 初始化完成后做一定操作
   */
  private initAfter() {
    if (this.options.gracefulShutdown.enable) {
      // 优雅关机
      this.glue.daruk_http_server_shutdown();
    }
  }
  /**
   * @desc 监听进程退出，打印日志，触发 exit 事件
   */
  private initExitHook() {
    this.exitHook = new ExitHook({
      onExit: (err: Error) => {
        if (err) {
          this.prettyLog(err.stack || err.message, { level: 'error' });
        }
        this.prettyLog('process is exiting');
        Events.emit('exit', err, this);
      },
      onExitDone: (code: number) => {
        this.prettyLog(`process exited: ${code}`);
      }
    });
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

export default DarukCore;
