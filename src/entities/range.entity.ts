import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { ObjectID } from 'mongodb';

@Entity()
export class Range {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  startTime: number;

  @Column()
  endTime: number;

  @Column()
  authorId: ObjectID;
}
