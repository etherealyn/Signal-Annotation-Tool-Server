import {Column, Entity, ObjectID, ObjectIdColumn} from 'typeorm';

@Entity()
export class Project {

  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  title: string;

  @Column()
  userIds: string[];

  @Column()
  description: string;

  @Column()
  modified: Date;
}
