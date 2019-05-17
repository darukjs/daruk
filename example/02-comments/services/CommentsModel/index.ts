import { BaseService, Context } from 'daruk';
import Comments from '../../entity/comments';

export default class CommentsModel extends BaseService {
  public constructor(ctx: Context) {
    super(ctx);
  }
  public async findAllAndCount(page = 0, limit = 10) {
    let connection = await this.ctx.glue.connection;
    let comments = await connection.getRepository(Comments).findAndCount({
      skip: limit * page,
      take: limit,
      order: {
        comments_id: 'DESC'
      }
    });
    return comments;
  }
  public async insert(name: string, content: string) {
    let connection = await this.ctx.glue.connection;
    let EntityManager = connection.manager;
    let comments = await EntityManager.create(Comments, {
      name,
      content
    });
    return EntityManager.save(comments);
  }
}
