import { Column } from 'typeorm';
import { Range } from './range.sub';

export class Label {
  @Column()
  name: string;

  @Column()
  series: Range[];

  constructor(name: string, series?: Range[]) {
    this.name = name;
    this.series = series;
  }
}
