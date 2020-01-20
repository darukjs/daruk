import Daruk from '../core/daruk';

export type Constructor<T = any> = new (...args: any[]) => T;

export interface PluginClass {
  initPlugin: (daruk: Daruk) => Promise<any>;
}

export interface Cron {
  stop: Function;
  start: Function;
}

export interface TimerClass {
  cronTime: string;
  start?: boolean;
  timeZone?: string;
  onTick: (cron: Cron, daruk: Daruk) => void;
  onComplete?: (cron: Cron, daruk: Daruk) => void;
  runOnInit?: boolean;
  context?: any;
  initTimer: (daruk: Daruk) => void;
}

export interface MiddlewareClass {
  initMiddleware: (daruk: Daruk) => Function;
}

export interface ParseType {
  [key: string]:
    | ArrayConstructor
    | BooleanConstructor
    | StringConstructor
    | NumberConstructor
    | ObjectConstructor;
}
export interface ParsedType {
  [key: string]: Array<string> | Boolean | String | Number | Object;
}
export type method = 'body' | 'query' | 'params';
export type validateFunc = (value: string) => string | undefined;
