import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { Directory } from './directory.sub';
import { ObjectID } from 'mongodb';
import { Label } from './label.entity';

@Entity()
export class Project {

  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  title: string;

  @Column()
  ownerId: ObjectID;

  @Column()
  memberIds: ObjectID[];

  @Column()
  description: string;

  @Column()
  modified: Date;

  @Column()
  fileTree: Directory;

  @Column()
  labels: Label[];
}
