/**
 * @fileOverview 通过装饰器注入挂载到 daruk 的模块
 */
import { darukContainer } from '../core/inversify.config';
import { TYPES } from '../core/types';
import { Constructor, PluginClass, TimerClass } from '../typings/daruk';
import { SERVICE } from './constants';

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

export function service() {
  return (target: Constructor) => {
    let Services = Reflect.getMetadata(SERVICE, Reflect) || [];
    let newMetadata = [target].concat(Services);
    Reflect.defineMetadata(SERVICE, newMetadata, Reflect);
  };
}
