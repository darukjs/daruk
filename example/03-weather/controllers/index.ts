import { controller, DarukContext, get, inject, injectable, middleware, Next } from '../../../src';
import config from '../config';
import weather from '../services/weather';
import utils from '../utils';

@injectable()
@controller()
class Index {
  @inject('weather') private weather!: weather;
  @middleware('cors')
  @get('/')
  public async index(ctx: DarukContext, next: Next) {
    await this.weather
      .getWeather()
      .then((weather: string) => {
        ctx.body = `Hi, ${config.author}, project version is ${config.version},
                Today is ${utils.getToday()}, weather is ${weather}`;
      })
      .catch((err: string) => {
        ctx.body = `Get weather information error, message: ${err}`;
      });
  }
}
