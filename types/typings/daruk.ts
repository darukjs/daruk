import Router = require('@koa/router');
import { CronJob } from 'cron';
/** @internal */
import Http = require('http');
/** @internal */
import Https = require('https');
import Koa = require('koa');
import Daruk from '../core/daruk';

/** @internal */
export type Server = Http.Server | Https.Server;

export type Next = () => Promise<any>;

/** @internal */
interface DarukRequest extends Koa.Request {
  id: string;
}
export interface DarukContext extends Koa.Context, Router.RouterParamContext {
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

/** @internal */
export interface ParseType {
  [key: string]:
    | ArrayConstructor
    | BooleanConstructor
    | StringConstructor
    | NumberConstructor
    | ObjectConstructor;
}
/** @internal */
export interface ParsedType {
  [key: string]: Array<string> | Boolean | String | Number | Object;
}
/** @internal */
export type method = 'body' | 'query' | 'params';
/** @internal */
export type validateFunc = (value: string) => string | undefined;

export interface MiddlewareConfig {
  middlewareName: string;
  options?: MiddlewareConfigOptions;
}

export interface MiddlewareConfigOptions {
  [key: string]: any;
}
