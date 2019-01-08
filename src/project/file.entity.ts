import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class File {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  path: string;

  @Column()
  size: number;
}
