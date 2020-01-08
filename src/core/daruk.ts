/**
 * @author xiaojue
 * @date 20190614
 * @fileoverview plugin化daruk core
 */
import KoaLogger = require('daruk-logger');
import Koa = require('koa');
import deepAssign = require('object-assign-deep');
import path = require('path');
import { PartialOptions } from '../../types/daruk_options';
import helpDecoratorClass from '../decorators/help_decorator_class';
import { getFilePathRecursive, uRequire } from '../utils';
import getDefaultOptions from './daruk_default_options';
import DarukPlugin from './plugin';
import Server from './server';

class Daruk extends Server {
  public plugins: typeof DarukPlugin.plugins;
  public constructor(name: string, options?: PartialOptions) {
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
      this.app = new Koa();
    } else {
      throw new Error('only support koa server Type');
    }
    // 初始化装饰器与 daurk 实例之间的桥梁
    helpDecoratorClass.init(this);
    // 初始化内置插件
    getFilePathRecursive(path.join(__dirname, '../plugins')).forEach((file: string) => {
      uRequire(file);
    });
    this.plugins = {};
    DarukPlugin.run(this).then(() => {
      this.plugins = DarukPlugin.plugins;
      this.emit('ready');
    });
    // tslint:disable-next-line
    const self = this;
    // 监听 koa 的错误事件，输出日志
    this.app.on('error', function handleKoaError(err: any) {
      self.prettyLog('[koa error] ' + (err.stack || err.message), { level: 'error' });
    });
  }
}

export default Daruk;
