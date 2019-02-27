import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { ObjectID } from 'mongodb';

export class Range {
  @Column()
  id: string;

  @Column()
  start: number;

  @Column()
  end: number;

  @Column()
  authorId: ObjectID;
}
