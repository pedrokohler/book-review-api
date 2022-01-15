import {
  IBook,
  IBookData,
  IBooksGroupedByGenre,
  IBooksGroupedByGenreAndYear,
} from '.';
import { IReviewData } from './review-data.interface';
import { IReview } from './review.interface';

export abstract class IBooksReviewsRepository {
  public abstract createBook(data: IBookData): Promise<IBook>;

  public abstract findBook(id: string): Promise<IBook>;

  public abstract getAllBooksGroupedByGenre(): Promise<IBooksGroupedByGenre>;

  public abstract getAllBooksGroupedByGenreAndReleaseData(): Promise<IBooksGroupedByGenreAndYear>;

  public abstract createReview({
    bookId,
    data,
  }: {
    bookId: string;
    data: IReviewData;
  }): Promise<IReview>;

  public abstract deleteReview({
    bookId,
    reviewId,
  }: {
    bookId: string;
    reviewId: string;
  }): Promise<boolean>;
}
