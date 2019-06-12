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
  public add(name: string, deps: string[], plugin: (Daruk: Daruk) => any | Promise<any>) {
    this.plugins[name] = {
      deps,
      mod: plugin,
      init: false
    };
  }
  public remove(name: string) {
    delete this.plugins[name];
  }
  public async run(Daruk: Daruk) {
    const names = Object.keys(this.plugins);
    // 对依赖排序，确保插件执行顺序
    while (names.length) {
      let name = names.shift();
      if (this.plugins[name].init) continue;
      let plugin = this.plugins[name];
      let deps = plugin.deps;
      if (deps.length) {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < deps.length; i++) {
          let name = deps[i];
          if (!this.plugins[name].init) {
            let p = await this.plugins[name].mod(Daruk);
            this.plugins[name].init = true;
            this.emit(`${name}:apply`, p);
          }
        }
      }
      let p = await this.plugins[name].mod(Daruk);
      this.plugins[name].init = true;
      this.emit(`${name}:apply`, p);
    }
  }
}

const plugins = new DarukPlugin();

export default plugins;
