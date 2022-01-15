import { IBook } from '.';

export interface IBooksGroupedByField {
  [field: string]: IBook[];
}
