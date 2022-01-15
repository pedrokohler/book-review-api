import { IBookData } from '.';
import { IReview } from './review.interface';

export interface IBook extends IBookData {
  id: string;
  reviews: IReview[];
}
