import { IBook } from 'src/use-cases/aggregates/books-reviews/common/interfaces';

export interface IAggregationResultForGenreAndYear {
  documents: IBook[];
  year: string;
  genre: string;
}
