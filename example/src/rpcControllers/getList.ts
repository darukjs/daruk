/**
 * @author whaleyou
 * @description getBasicInfo
 */

import { BaseController, rpc } from 'daruk-rpc';

export default class GetList extends BaseController {
  @rpc()
  public async index() {
    console.log(this.service.xxx)
    console.log(this.app.glue.xxxx)
    this.ctx.body = {};
  }
}
