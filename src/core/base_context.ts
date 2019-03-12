/**
 * @fileOverview controller、service 继承的基类
 * 用于挂载 app、ctx、service
 */

import { Daruk } from '../typings/daruk';

export default class BaseContext {
  public ctx: Daruk.Context;
  public app: Daruk.DarukCore;
  public service: Daruk.Context['service'];
  public constructor(ctx: Daruk.Context) {
    this.ctx = ctx;
    this.app = ctx.app;
    this.service = ctx.service;
  }
}
