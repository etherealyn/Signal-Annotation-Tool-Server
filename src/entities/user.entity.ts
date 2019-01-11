import { Column, Entity, Index, ObjectID, ObjectIdColumn} from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  @Index({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  @Index({ unique: true })
  email: string;
}
