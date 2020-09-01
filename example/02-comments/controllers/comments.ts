import { controller, DarukContext, inject, injectable, Next, post, prefix } from '../../../src';
import CommentsModel from '../services/CommentsModel';

@injectable()
@controller()
@prefix('/comments')
class Comments {
  @inject('CommentsModel') private CommentsModel!: CommentsModel;
  @post('/insert')
  public async index(ctx: DarukContext, next: Next) {
    let { name, content } = ctx.request.body;
    await this.CommentsModel.insert(name, content);
    ctx.redirect('/');
    await next();
  }
}
