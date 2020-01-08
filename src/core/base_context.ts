/**
 * @fileOverview controller、service 继承的基类
 * 用于挂载 app、ctx、service
 */

import koa = require('koa');
import { DarukCore } from '../typings/daruk';

export default class BaseContext {
  public ctx: koa['context'];
  public app: DarukCore;
  public module: DarukCore['module'];
  public constructor(ctx: koa['context'], daruk: DarukCore) {
    this.ctx = ctx;
    this.ctx.app = daruk;
    this.ctx.module = daruk.module;
  }
}
