/**
 * @fileOverview controller、service 继承的基类
 * 用于挂载 app、ctx、service
 */

import { Context } from '../typings/daruk';
import Daruk from './daruk';

export default class BaseContext {
  public ctx: Context;
  public app: Daruk;
  public module: Daruk['module'];
  public constructor(ctx: Context, daruk: Daruk) {
    this.ctx = ctx;
    this.ctx.module = daruk.module;
  }
}
