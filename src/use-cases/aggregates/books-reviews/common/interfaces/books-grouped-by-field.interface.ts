import { IBook } from './book.interface';

export interface IBooksGroupedByField {
  [field: string]: IBook[];
}
