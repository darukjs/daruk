/**
 * @fileOverview daruk 类与装饰器之间的桥梁
 * 用于装饰器获取挂载到 daruk 中的模块（如 util、glue、logger、config 等）
 * 这样的实现前提是 Daruk 在整个应用中只会被实例化一次
 */

import { Daruk } from '../typings/daruk';

/**
 * @desc 装饰器辅助类
 */
class HelpDecoratorClass {
  private app: Daruk.DarukCore;

  /**
   * @desc 以 daruk 对象作为参数初始化该类
   */
  public init(app: Daruk.DarukCore) {
    this.app = app;
  }
  public getModule(moduleName: string) {
    // @ts-ignore
    return this.app[moduleName];
  }
}

export default new HelpDecoratorClass();
