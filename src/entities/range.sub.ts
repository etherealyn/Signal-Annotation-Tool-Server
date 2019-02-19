import { Column } from 'typeorm';
import { ObjectID } from 'mongodb';

export class Range {
  @Column()
  start: number;

  @Column()
  end: number;

  @Column()
  authorId: ObjectID;
}
