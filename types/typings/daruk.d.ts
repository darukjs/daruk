import { CronJob } from 'cron';
import Http = require('http');
import Https = require('https');
import Koa = require('koa');
import Daruk from '../core/daruk';

export type Server = Http.Server | Https.Server;

export type Next = () => Promise<any>;

interface DarukRequest extends Koa.Request {
  id: string;
}

export interface DarukContext extends Koa.Context {
  [key: string]: any;
  request: DarukRequest;
}

export type Constructor<T = any> = new (...args: any[]) => T;

export interface PluginClass {
  initPlugin: (daruk: Daruk) => Promise<any>;
}

export interface TimerClass {
  cronTime: string;
  start?: boolean;
  timeZone?: string;
  onTick: (cron: CronJob, daruk: Daruk) => void;
  onComplete?: (cron: CronJob, daruk: Daruk) => void;
  runOnInit?: boolean;
  context?: any;
  initTimer: (daruk: Daruk) => void;
}

export interface MiddlewareClass {
  initMiddleware: (daruk: Daruk) => Koa.Middleware | void | Function;
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
