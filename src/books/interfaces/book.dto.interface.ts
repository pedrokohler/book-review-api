import { IBookData } from '.';

export interface IBookDto extends Omit<IBookData, 'releaseDate'> {
  releaseDate: string;
}
