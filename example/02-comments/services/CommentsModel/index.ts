import { DarukContext, inject, injectable, service } from '../../../../src';
import Comments from '../../entity/comments';
import Db from '../../glues/connection';

function sleep(n: number) {
  return new Promise((r) => {
    setTimeout(() => {
      r();
    }, n);
  });
}

@injectable()
@service()
export default class CommentsModel {
  public ctx!: DarukContext;
  @inject('Db') public Db!: Db;
  public async findAllAndCount(page = 0, limit = 10) {
    let connection = await this.Db.getConnection();
    let comments = connection.getRepository(Comments).findAndCount({
      skip: limit * page,
      take: limit,
      order: {
        comments_id: 'DESC'
      }
    });
    return comments;
  }
  public async test() {
    let a = this.ctx.query.a;
    // tslint:disable-next-line:no-magic-numbers
    await sleep(2000);
    return a;
  }
  public async insert(name: string, content: string) {
    let connection = await this.Db.getConnection();
    let EntityManager = connection.manager;
    let comments = await EntityManager.create(Comments, {
      name,
      content
    });
    return EntityManager.save(comments);
  }
}
