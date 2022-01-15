import { IBookParam } from '.';

export interface IBookDTO extends Omit<IBookParam, 'releaseDate'> {
  releaseDate: string;
}
