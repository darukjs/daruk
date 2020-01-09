import Koa = require('koa');
import Daruk from '../core/daruk';

export interface Context extends Koa.Context {
  module: Daruk['module'];
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
