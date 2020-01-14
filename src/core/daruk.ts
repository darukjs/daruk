/**
 * @author xiaojue
 * @date 20190614
 * @update 20200113
 * @fileoverview plugin化daruk core
 */
import KoaLogger = require('daruk-logger');
import { EventEmitter } from 'events';
import Http = require('http');
import Https = require('https');
import { inject, injectable, interfaces } from 'inversify';
import is = require('is');
import Koa = require('koa');
import deepAssign = require('object-assign-deep');
import { dirname, join } from 'path';
import { Options, PartialOptions } from '../../types/daruk_options';
import helpDecoratorClass from '../decorators/help_decorator_class';
import mockHttp from '../mock/http_server';
import { debugLog, uRequire } from '../utils';
import { filterBuiltInModule } from '../utils/filter_built_in_module';
import getDefaultOptions from './daruk_default_options';
import Loader from './loader';
import { TYPES } from './types';

@injectable()
class Daruk extends EventEmitter {
  public plugins: { [key: string]: any };
  public name: string;
  public app: Koa;
  public httpServer: Http.Server | Https.Server;
  public options: Options;
  public logger: KoaLogger.logger;
  public module: {
    [key: string]: any;
  };
  @inject(TYPES.Loader) public loader: Loader;
  @inject(TYPES.Koa) private _koa: interfaces.Newable<Koa>;
  @inject(TYPES.KoaLogger) private _koaLogger: interfaces.Newable<KoaLogger.logger>;
  public constructor() {
    super();
    this.module = {};
    this.plugins = {};
    // 初始化装饰器与 daurk 实例之间的桥梁
    helpDecoratorClass.init(this);
  }
  public initOptions(options: PartialOptions = {}) {
    const rootPath = options.rootPath || dirname(require.main.filename);
    const defaultOptions = getDefaultOptions(rootPath, options.name, options.debug);
    const customLogger = options.customLogger;
    // customLogger 可能是一个类，不能进行 deep assign
    delete options.customLogger;
    this.options = deepAssign({}, defaultOptions, options);
    // 还原被 delete 的 customLogger
    this.options.customLogger = options.customLogger = customLogger;
    // 初始化 logger
    this.logger = customLogger || new this._koaLogger(this.options.loggerOptions);
    // 用于保存 DarukLoader 加载的模块
    if (this.options.serverType === 'koa') {
      this.app = new this._koa();
    } else {
      throw new Error('only support koa server Type');
    }
    // tslint:disable-next-line
    const self = this;
    // 监听 koa 的错误事件，输出日志
    this.app.on('error', function handleKoaError(err: any) {
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
    const ctx = this.app.createContext(request, response);
    // 为模拟的 ctx 绑定 service
    ctx.module = this.module;
    return ctx;
  }
  /**
   * @desc 启动服务
   */
  public async listen(...args: any[]): Promise<Http.Server> {
    this.httpServer = this.app.listen(...args);
    this.emit('ready');
    return this.httpServer;
  }
  public async loadPlugin(paths: string[] = []) {
    await this.plugin('../plugins/wrapMiddlewareUse');
    await this.plugin('../plugins/exitHook');
    await this.plugin('../plugins/darukConfig');
    await this.plugin('../plugins/daruk_http_server_shutdown');
    await this.plugin('../plugins/router');
    await this.plugin('../plugins/timer');
    for (let path of paths) {
      await this.plugin(path);
    }
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
   * @desc 过滤无用日志的输出
   */
  public logModuleMsg(type: string, moduleObj: any) {
    if (!moduleObj) return;
    const keys = filterBuiltInModule(type, Object.keys(moduleObj));
    if (keys.length > 0) {
      this.prettyLog(JSON.stringify(keys), { type, init: true });
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
    this.module[type][key] = value;
  }
  /**
   * @desc 保存数据类型的模块到 this.module[type]
   * 主要是针对 middlewareOrder
   */
  public setArrayModule(type: string, arr: []) {
    this.module[type] = arr;
  }
  private async plugin(path: string) {
    const plugin = uRequire(join(__dirname, path));
    this.plugins[path] = await plugin(this);
  }
}

export default Daruk;
