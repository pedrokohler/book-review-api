import { DateTime } from 'luxon';

export interface IBook {
  id: string;
  bookName: string;
  author: string;
  releaseDate: DateTime;
  genre: string;
}
