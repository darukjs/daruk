import { IsIP, IsNotEmpty } from '../../../node_modules/class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from '../../../node_modules/typeorm';

/** IP信息 */
@Entity()
export default class IpInfo {
  /** 编号 */
  @PrimaryGeneratedColumn({ type: 'int' })
  public id?: number;

  /** 名称 */
  @Column({ type: 'varchar', unique: true, length: 30 })
  @IsNotEmpty()
  public name!: string;

  /** IP地址 */
  @Column({ type: 'varchar', unique: true, length: 15 })
  @IsIP()
  public address!: string;
}
