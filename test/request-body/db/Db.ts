import { Connection, createConnection } from 'typeorm';
import { join } from 'path';
import IpInfo from './../entity/info';

export default class Db {
  public static connection: Connection;

  public async getConnection() {
    if (!Db.connection) {
      Db.connection = await createConnection({
        type: 'sqlite',
        database: join(__dirname, '../sql/database.db'),
        entities: [IpInfo],
        synchronize: true,
        logging: process.env.NODE_ENV === 'dev'
      });
    }
    return Db.connection;
  }
}
