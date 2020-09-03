/**
 * @author xiaojue
 * @date 20190614
 * @update 20200113
 * @fileoverview plugin化daruk core
 */
import KoaLogger = require('daruk-logger');
import { EventEmitter } from 'events';
import { buildProviderModule } from 'inversify-binding-decorators';
import Koa = require('koa');
import { ListenOptions } from 'net';
import deepAssign = require('object-assign-deep');
import { dirname, join } from 'path';
import recursive = require('recursive-readdir');
import { Options, PartialOptions } from '../../types/daruk_options';
import mockHttp from '../mock/http_server';
import { PluginClass, Server } from '../typings/daruk';
import { debugLog, isJsTsFile, JsTsReg } from '../utils';
import getDefaultOptions from './daruk_default_options';
import { darukContainer } from './inversify.config';
import { TYPES } from './types';

class Daruk extends EventEmitter {
  [key: string]: any;
  public name!: string;
  public app: Koa;
  public httpServer!: Server;
  public logger!: KoaLogger.logger;
  public options!: Options;
  public constructor() {
    super();
    // 用于保存 DarukLoader 加载的模块
    this.app = new Koa();
    // tslint:disable-next-line
    const self = this;
    // 监听 koa 的错误事件，输出日志
    this.app.on('error', function handleKoaError(err: Error) {
      self.prettyLog('[koa error] ' + (err.stack || err.message), { level: 'error' });
    });
  }
  public _initOptions(options: PartialOptions = {}) {
    const rootPath = options.rootPath || dirname(require?.main?.filename as string);
    const defaultOptions = getDefaultOptions(rootPath, options.name, options.debug);
    const customLogger = options.customLogger;
    // customLogger 可能是一个类，不能进行 deep assign
    delete options.customLogger;
    this.options = deepAssign({}, defaultOptions, options);
    // 还原被 delete 的 customLogger
    this.options.customLogger = options.customLogger = customLogger;
    // 初始化 logger
    this.logger = customLogger || new KoaLogger.logger(this.options.loggerOptions);
    this.name = this.options.name;
  }
  public async loadFile(path: string) {
    return this._loadFile(join(this.options.rootPath, path));
  }
  public async binding() {
    await this._loadFile(join(__dirname, '../plugins'));
    await this._loadFile(join(__dirname, '../built_in'));
    const plugins = darukContainer.getAll<PluginClass>(TYPES.PLUGINCLASS);
    for (let plugin of plugins) {
      let retValue = await plugin.initPlugin(this);
      if (darukContainer.isBoundNamed(TYPES.PluginInstance, plugin.constructor.name)) {
        darukContainer
          .rebind(TYPES.PluginInstance)
          .toConstantValue(retValue)
          .whenTargetNamed(plugin.constructor.name);
      } else {
        darukContainer
          .bind(TYPES.PluginInstance)
          .toConstantValue(retValue)
          .whenTargetNamed(plugin.constructor.name);
      }
    }
    this.emit('init', darukContainer);
    darukContainer.load(buildProviderModule());
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
    return ctx;
  }
  /**
   * @desc 启动服务
   */
  public listen(
    port?: number,
    hostname?: string,
    backlog?: number,
    listeningListener?: () => void
  ): Server;
  public listen(port: number, hostname?: string, listeningListener?: () => void): Server;
  public listen(port: number, backlog?: number, listeningListener?: () => void): Server;
  public listen(port: number, listeningListener?: () => void): Server;
  public listen(path: string, backlog?: number, listeningListener?: () => void): Server;
  public listen(path: string, listeningListener?: () => void): Server;
  public listen(handle: any, backlog?: number, listeningListener?: () => void): Server;
  public listen(handle: any, listeningListener?: () => void): Server;
  public listen(options: ListenOptions, listeningListener?: () => void): Server;
  public listen(...args: any[]): Server {
    // @ts-ignore
    this.httpServer = this.app.listen.apply(this.app, args);
    this.emit('serverReady', this.httpServer);
    return this.httpServer;
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
  private async _loadFile(path: string) {
    return recursive(path).then((files) => {
      return files
        .filter((file) => isJsTsFile(file))
        .map((file) => file.replace(JsTsReg, ''))
        .forEach((path: string) => {
          require(path);
        });
    });
  }
}

export default Daruk;
