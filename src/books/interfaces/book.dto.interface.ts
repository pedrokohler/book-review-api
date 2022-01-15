import { IBookParam } from '.';

export interface BookDTO extends Omit<IBookParam, 'releaseDate'> {
  releaseDate: string;
}
