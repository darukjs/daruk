import { provide } from '../../../';
import Db from './Db';
import IpInfo from './../entity/info';

@provide('IpInfoDb')
export default class IpInfoDb {
  private Db: Db = new Db();

  private async getConnection() {
    return await this.Db.getConnection();
  }

  public async Select() {
    const connect = await this.getConnection();
    return await connect.getRepository(IpInfo).find();
  }

  public async Insert(data: IpInfo) {
    const connect = await this.getConnection();
    return await connect.getRepository(IpInfo).insert(data);
  }
}
