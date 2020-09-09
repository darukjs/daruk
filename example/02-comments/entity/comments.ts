import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Comments {
  @PrimaryGeneratedColumn()
  public comments_id!: number;

  @Column()
  public name!: string;

  @Column()
  public content!: string;
}

export default Comments;
