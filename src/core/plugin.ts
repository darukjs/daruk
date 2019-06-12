import { deepStrictEqual } from 'assert';
import { EventEmitter } from 'events';
import Daruk from './daruk';

class DarukPlugin extends EventEmitter {
  public plugins: {
    [key: string]: any;
  };
  public constructor() {
    super();
    this.plugins = {};
  }
  public add(name: string, deps: string[], plugin: (Daruk: Daruk) => any) {
    this.plugins[name] = {
      deps,
      mod: plugin,
      init: false
    };
  }
  public remove(name: string) {
    delete this.plugins[name];
  }
  public run(Daruk: Daruk) {
    const names = Object.keys(this.plugins);
    // 对依赖排序，确保插件执行顺序
    while (names.length) {
      let name = names.shift();
      if (this.plugins[name].init) continue;
      let plugin = this.plugins[name];
      if (plugin.deps.length) {
        plugin.deps.forEach((dep: string) => {
          if (!this.plugins[dep].init) {
            let p = this.plugins[dep].mod(Daruk);
            this.plugins[dep].init = true;
            this.emit(`${dep}:apply`, p);
          }
        });
      }
      let p = this.plugins[name].mod(Daruk);
      this.plugins[name].init = true;
      this.emit(`${name}:apply`, p);
    }
  }
}

const plugins = new DarukPlugin();

export default plugins;
