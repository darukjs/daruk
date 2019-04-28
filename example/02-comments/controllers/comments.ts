import { BaseController, Context, post } from 'daruk';

export default class Comments extends BaseController {
  @post('/insert')
  public async index(ctx: Context, next: Function) {
    let { name, content } = ctx.request.body;
    await ctx.service.CommentsModel.insert(name, content);
    ctx.redirect('/');
    await next();
  }
}
