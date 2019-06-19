/**
 * @fileOverview controller、service 继承的基类
 * 用于挂载 app、ctx、service
 */

import Koa = require('koa');
import Daruk from './daruk';

export default class BaseContext {
  public ctx: Koa['context'];
  public app: Daruk;
  public service: {
    [key: string]: any;
  };
  public constructor(ctx: Koa['context']) {
    this.ctx = ctx;
    this.app = ctx.app;
    this.service = ctx.service;
  }
}
