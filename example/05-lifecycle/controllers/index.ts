import { BaseController, Context, get } from 'daruk';

export default class Index extends BaseController {
  @get('/')
  public index(ctx: Context, next: Function) {
    let randomWord = ctx.util.randomWord;
    ctx.body = `hi, ${randomWord(true, 10, 10)}`;
  }
}
