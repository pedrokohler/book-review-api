import {
  IBook,
  IBookData,
  IBooksGroupedByGenre,
  IBooksGroupedByGenreAndYear,
} from '.';

export abstract class IBooksReviewsRepository {
  public abstract create(data: IBookData): Promise<IBook>;

  public abstract find(id: string): Promise<IBook>;

  public abstract getAllGroupedByGenre(): Promise<IBooksGroupedByGenre>;

  public abstract getAllGroupedByGenreAndReleaseData(): Promise<IBooksGroupedByGenreAndYear>;
}
