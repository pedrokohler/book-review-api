import { DateTime } from 'luxon';

export interface IBookData {
  bookName: string;
  author: string;
  releaseDate: DateTime;
  genre: string;
}
