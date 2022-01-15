import { IBookData } from '../../common/interfaces';

export interface IBookDto extends Omit<IBookData, 'releaseDate'> {
  releaseDate: string;
}
