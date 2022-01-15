import { IBookData } from '.';

export interface IBookDTO extends Omit<IBookData, 'releaseDate'> {
  releaseDate: string;
}
