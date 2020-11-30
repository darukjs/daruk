import {
  controller,
  Daruk,
  darukContainer,
  DarukContext,
  get,
  inject,
  injectable,
  Next
} from '../../../src';

@controller()
class HelloWorld {
  @inject('Daruk') public daruk!: Daruk;
  @get('/')
  public async index(ctx: DarukContext, next: Next) {
    this.daruk.logger.info('abcdef');
    ctx.body = 'hello world';
  }
}
