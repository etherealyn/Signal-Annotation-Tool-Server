import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { ObjectID } from 'mongodb';

export class Range {
  @Column()
  id: string;

  @Column()
  startTime: number;

  @Column()
  endTime: number;

  @Column()
  authorId: ObjectID;
}
