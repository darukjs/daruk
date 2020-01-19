import Daruk from '../core/daruk';

export type Constructor<T = any> = new (...args: any[]) => T;

export interface pluginClass {
  initPlugin: (daruk: Daruk) => Promise<any>;
}

export interface timerClass {
  cronTime: string;
  start?: boolean;
  timeZone?: string;
  onTick: () => void;
  onComplete?: () => void;
  runOnInit?: () => void;
  context?: any;
  initTimer: (daruk: Daruk) => void;
}

export interface middlewareClass {
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
