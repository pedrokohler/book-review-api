import { IBook } from '.';

export interface IBooksGroupedByGenreAndYear {
  [genre: string]: {
    [year: number]: IBook[];
  };
}
