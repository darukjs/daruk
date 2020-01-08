import KoaLogger = require('daruk-logger');
import { EventEmitter } from 'events';
import is = require('is');
import { Options } from '../../types/daruk_options';
import { debugLog } from '../utils';
import { filterBuiltInModule } from '../utils/filter_built_in_module';

export default class Module extends EventEmitter {
  public options: Options;
  public logger: KoaLogger.logger;
  public module: {
    [key: string]: any;
  };
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
   * @desc 支持合并单个模块到 this.module[type]
   * 供 register 类型的方法使用
   */
  public setModule<T>(type: string, key: string, value: any) {
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
}
