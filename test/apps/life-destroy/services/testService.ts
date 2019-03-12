import { BaseService } from '../../../../src';

export default class TestService extends BaseService {
  public testMethod () {}
  public _destroy () {
    this.ctx.body = '_destroyed';
  }
}