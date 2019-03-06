import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { Range } from './range.entity';
import { ObjectID } from 'mongodb';

@Entity()
export class Label {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  series: Range[];

  constructor(name: string, series?: Range[]) {
    this.name = name;
    this.series = series;
  }
}
