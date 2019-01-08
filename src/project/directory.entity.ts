import { Entity, Tree, TreeChildren, TreeParent } from 'typeorm';
import { File } from './file.entity';

@Entity()
@Tree('closure-table')
export class Directory extends File {

  @TreeChildren()
  children: File[];

  @TreeParent()
  parent: Directory[];
}
