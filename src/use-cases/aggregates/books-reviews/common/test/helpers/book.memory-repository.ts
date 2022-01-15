import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import {
  IBook,
  IBookData,
  IBooksGroupedByGenre,
  IBooksGroupedByGenreAndYear,
  IBooksReviewsRepository,
} from '../../interfaces';
import { IReviewData } from '../../interfaces/review-data.interface';
import { IReview } from '../../interfaces/review.interface';

@Injectable()
export class BookMemoryRepository implements IBooksReviewsRepository {
  private books: IBook[];

  constructor() {
    this.books = [];
  }

  public async createBook(data: IBookData): Promise<IBook> {
    const id = randomUUID();
    const book: IBook = { id, ...data };
    this.books.push(book);
    return book;
  }

  public async findBook(id: string): Promise<IBook> {
    const book = this.books.find((book) => book.id === id);
    return book;
  }

  public async getAllBooksGroupedByGenre(): Promise<IBooksGroupedByGenre> {
    return this.books.reduce<IBooksGroupedByGenre>((groupedBooks, book) => {
      const { genre } = book;
      const booksOfSameGenre = groupedBooks[genre] || [];
      return {
        ...groupedBooks,
        [genre]: [...booksOfSameGenre, book],
      };
    }, {});
  }

  public async getAllBooksGroupedByGenreAndReleaseData(): Promise<IBooksGroupedByGenreAndYear> {
    return this.books.reduce<IBooksGroupedByGenreAndYear>(
      (groupedBooks, book) => {
        const { genre, releaseDate } = book;
        const { year } = releaseDate;
        const booksOfSameGenre = groupedBooks[genre] || {};
        const booksOfSameGenreAndYear = groupedBooks[genre]?.[year] || [];
        return {
          ...groupedBooks,
          [genre]: {
            ...booksOfSameGenre,
            [year]: [...booksOfSameGenreAndYear, book],
          },
        };
      },
      {},
    );
  }

  public createReview({
    bookId,
    data,
  }: {
    bookId: string;
    data: IReviewData;
  }): Promise<IReview> {
    throw new Error('Method not implemented.');
  }
  public deleteReview({
    bookId,
    reviewId,
  }: {
    bookId: string;
    reviewId: string;
  }): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
