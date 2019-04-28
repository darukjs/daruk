import { BaseController, Context, get } from 'daruk';

export default class Index extends BaseController {
  @get('/')
  public async index(ctx: Context, next: Function) {
    let { page = 1, limit = 5 } = ctx.query;
    page = page - 1;
    let [comments, counts] = await ctx.service.CommentsModel.findAllAndCount(page, limit);
    await ctx.render('index', {
      comments,
      counts,
      page,
      limit
    });
  }
}
