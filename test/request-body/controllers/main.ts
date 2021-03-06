import * as fs from 'fs';
import { controller, DarukContext, post, Next, RequestBody, inject, get } from '../../../src';
import IpInfoDb from '../db/IpInfoDb';
import IpInfo from '../entity/info';

@controller()
class mainController {
  @inject('IpInfoDb') ipInfoDb!: IpInfoDb;

  @get('/')
  public async html(ctx: DarukContext, next: Next) {
    ctx.type = 'text/html';
    ctx.body = await new Promise((res, rej) => {
      fs.readFile('./test/request-body/web/index.html', function (err, data) {
        if (err) {
          rej(err);
        } else {
          res(data);
        }
      });
    });
    await next();
  }

  @post('/')
  public async append(ctx: DarukContext, next: Next, @RequestBody(IpInfo) data: IpInfo) {
    await this.ipInfoDb.Insert(data);
    ctx.body = await this.ipInfoDb.Select();
    await next();
  }
}
