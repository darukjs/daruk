import { inject, provide } from '../../../../src';
import Comments from '../../entity/comments';
import Db from '../../glues/connection';

@provide('CommentsModel')
export default class CommentsModel {
  @inject('Db') public Db: Db;
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
