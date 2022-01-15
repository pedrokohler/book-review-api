import { IBook } from '.';

export interface IBooksGroupedByGenre {
  [genre: string]: IBook[];
}
