import { join } from 'path';
import { Connection, createConnection } from 'typeorm';
import { fluentProvide } from '../../../src';

import Comments from '../entity/comments';

@(fluentProvide('Db').inSingletonScope().done())
export default class Db {
  public connection!: Connection;
  public async getConnection() {
    if (!this.connection) {
      this.connection = await createConnection({
        type: 'sqlite',
        database: join(__dirname, '../database/comments.db'),
        entities: [Comments],
        synchronize: true,
        logging: process.env.NODE_ENV === 'dev'
      });
    }
    return this.connection;
  }
}
