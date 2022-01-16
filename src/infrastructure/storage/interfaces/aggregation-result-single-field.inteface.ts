import { IBook } from 'src/use-cases/aggregates/books-reviews/common/interfaces';

export interface IAggregationResultForSingleField {
  documents: IBook[];
  author?: string;
  genre?: string;
}
