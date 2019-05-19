import { BaseController, config, Context, Daruk, get, middleware, util } from 'daruk';

export default class Index extends BaseController {
  @util('getToday')
  public getToday: Daruk['util']['getToday'];
  @config('author')
  public author: Daruk['config']['author'];
  @config('version')
  public version: Daruk['config']['version'];
  @middleware('cors')
  @get('/')
  public async index(ctx: Context, next: Function) {
    await ctx.service.weather.getWeather()
      .then((weather: string) => {
        ctx.body = `Hi, ${this.author}, project version is ${this.version},
                Today is ${this.getToday()}, weather is ${weather}`;
      })
      .catch((err: string) => {
        ctx.body = `Get weather information error, message: ${err}`;
      });
  }
}
