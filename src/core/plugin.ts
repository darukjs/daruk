import { EventEmitter } from 'events';
import { DarukCore } from '../typings/daruk';

class DarukPlugin extends EventEmitter {
  public plugins: {
    [key: string]: any;
  };
  public constructor() {
    super();
    this.plugins = {};
  }
  public add(name: string, plugin: (Daruk: DarukCore) => any | Promise<any>) {
    this.plugins[name] = plugin;
  }
  public remove(name: string) {
    delete this.plugins[name];
  }
  public run(Daruk: DarukCore) {
    let pluginOrder = Daruk.options.pluginOrder;
    pluginOrder.unshift(
      'wrapMiddlewareUse',
      'darukExitHook',
      'darukHttpServerShutdown',
      'darukGlobalConfig',
      'darukRouter',
      'darukTimer'
    );
    Daruk.emit('pluginOrderReady', pluginOrder);
    // 对依赖排序，确保插件执行顺序
    while (pluginOrder.length) {
      let name = pluginOrder.shift();
      let plugin = this.plugins[name];
      let p = plugin(Daruk);
      this.emit(`${name}:apply`, p);
    }
  }
}

const plugins = new DarukPlugin();

export default plugins;
