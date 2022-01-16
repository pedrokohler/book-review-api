import {
  IBook,
  IBookData,
  IBooksGroupedByField,
  IBooksGroupedByGenreAndYear,
  IReview,
  IReviewData,
} from '.';

export abstract class IBooksReviewsRepository {
  public abstract createBook(data: IBookData): Promise<IBook>;

  public abstract findBook(id: string): Promise<IBook>;

  public abstract getAllBooksGroupedByGenre(): Promise<IBooksGroupedByField>;

  public abstract getAllBooksGroupedByGenreAndReleaseDate(): Promise<IBooksGroupedByGenreAndYear>;

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

  public abstract getAllBooksGroupedByAuthor(): Promise<IBooksGroupedByField>;
}
