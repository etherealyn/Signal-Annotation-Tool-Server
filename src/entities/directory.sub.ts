import { Tree, TreeChildren, TreeParent } from 'typeorm';
import { File } from './file.sub';

@Tree('closure-table')
export class Directory extends File {

  /**
   * root if undefined
   */
  @TreeParent()
  parent: Directory[];

  @TreeChildren()
  children: File[];
}
