/**
 * @fileOverview 通过装饰器注入挂载到 daruk 的模块
 */
import { darukContainer } from '../core/inversify.config';
import { TYPES } from '../core/types';
import { Constructor, PluginClass, TimerClass } from '../typings/daruk';

export function plugin() {
  return (target: Constructor) => {
    darukContainer.bind<PluginClass>(TYPES.PLUGINCLASS).to(target);
  };
}

export function timer() {
  return (target: Constructor) => {
    darukContainer.bind<TimerClass>(TYPES.Timer).to(target);
  };
}
