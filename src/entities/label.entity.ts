import { Column} from 'typeorm';
import { Range } from './range.entity';
import { ObjectID } from 'mongodb';

export class Label {
  @Column()
  id: string;

  @Column()
  name: string;

  @Column()
  series: Range[];

  constructor(name: string, series?: Range[]) {
    this.name = name;
    this.series = series;
  }
}
