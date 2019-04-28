import { Daruk } from 'daruk';
import { join } from 'path';
import { createConnection } from 'typeorm';

import Comments from '../entity/comments';

export default async function(daruk: Daruk) {
  const connection = await createConnection({
    type: 'sqlite',
    database: join(__dirname, '../database/comments.db'),
    entities: [Comments],
    synchronize: true,
    logging: process.env.NODE_ENV === 'dev'
  });
  return connection;
}
