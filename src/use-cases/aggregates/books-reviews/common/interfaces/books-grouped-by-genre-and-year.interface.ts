import { IBook } from './book.interface';

export interface IBooksGroupedByGenreAndYear {
  [genre: string]: {
    [year: number]: IBook[];
  };
}
