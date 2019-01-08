import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { Directory } from './directory.entity';

@Entity()
export class Project {

  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  title: string;

  @Column()
  ownerId: string;

  @Column()
  memberIds: string;

  @Column()
  description: string;

  @Column()
  modified: Date;

  @Column()
  root: Directory;
}
