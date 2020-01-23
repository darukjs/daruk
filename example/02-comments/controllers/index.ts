import { controller, DarukContext, get, inject, injectable, Next } from '../../../src';
import CommentsModel from '../services/CommentsModel';

@injectable()
@controller()
class Index {
  @inject('CommentsModel') private CommentsModel: CommentsModel;
  @get('/')
  public async index(ctx: DarukContext, next: Next) {
    let { page = 1, limit = 5 } = ctx.query;
    page = page - 1;
    let [comments, counts] = await this.CommentsModel.findAllAndCount(page, limit);
    await ctx.render('index', {
      comments,
      counts,
      page,
      limit
    });
  }
}
