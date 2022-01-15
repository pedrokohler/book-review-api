import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import {
  IBook,
  IBookData,
  IBooksGroupedByField,
  IBooksGroupedByGenreAndYear,
  IBooksReviewsRepository,
} from '../../interfaces';
import { IReviewData } from '../../interfaces/review-data.interface';
import { IReview } from '../../interfaces/review.interface';

@Injectable()
export class BookMemoryRepository implements IBooksReviewsRepository {
  public books: IBook[];

  constructor() {
    this.books = [];
  }

  public async createBook(data: IBookData): Promise<IBook> {
    const id = randomUUID();
    const book: IBook = { ...data, id, reviews: [] };
    this.books.push(book);
    return book;
  }

  public async findBook(id: string): Promise<IBook> {
    const book = this.books.find((book) => book.id === id);
    return book;
  }

  public getAllBooksGroupedByAuthor(): Promise<IBooksGroupedByField> {
    return this.getAllBooksGroupedByField('author');
  }

  public async getAllBooksGroupedByGenre(): Promise<IBooksGroupedByField> {
    return this.getAllBooksGroupedByField('genre');
  }

  private async getAllBooksGroupedByField(
    fieldName: string,
  ): Promise<IBooksGroupedByField> {
    return this.books.reduce<IBooksGroupedByField>((groupedBooks, book) => {
      const fieldValue = book[fieldName];
      const booksOfSameGenre = groupedBooks[fieldValue] || [];
      return {
        ...groupedBooks,
        [fieldValue]: [...booksOfSameGenre, book],
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

  public async createReview({
    bookId,
    data,
  }: {
    bookId: string;
    data: IReviewData;
  }): Promise<IReview> {
    const book = await this.findBook(bookId);
    if (!book) {
      return null;
    }
    const id = randomUUID();
    const review = { id, ...data };
    book.reviews.push(review);
    return review;
  }

  public async deleteReview({
    bookId,
    reviewId,
  }: {
    bookId: string;
    reviewId: string;
  }): Promise<boolean> {
    const book = await this.findBook(bookId);
    if (!book) {
      return false;
    }

    const previousReviewsLength = book.reviews.length;
    book.reviews = book.reviews.filter((review) => review.id !== reviewId);
    return book.reviews.length !== previousReviewsLength;
  }
}
