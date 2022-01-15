import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import {
  IBook,
  IBookData,
  IBooksGroupedByGenre,
  IBooksGroupedByGenreAndYear,
} from 'src/books/interfaces';
import { IBookRepository } from 'src/books/interfaces/book-repository.interface';

@Injectable()
export class BookMemoryRepository implements IBookRepository {
  private books: IBook[];

  constructor() {
    this.books = [];
  }

  public async create(data: IBookData): Promise<IBook> {
    const id = randomUUID();
    const book: IBook = { id, ...data };
    this.books.push(book);
    return book;
  }

  public async find(id: string): Promise<IBook> {
    const book = this.books.find((book) => book.id === id);
    return book;
  }

  public async getAllGroupedByGenre(): Promise<IBooksGroupedByGenre> {
    return this.books.reduce<IBooksGroupedByGenre>((groupedBooks, book) => {
      const { genre } = book;
      const booksOfSameGenre = groupedBooks[genre] || [];
      return {
        ...groupedBooks,
        [genre]: [...booksOfSameGenre, book],
      };
    }, {});
  }

  public async getAllGroupedByGenreAndReleaseData(): Promise<IBooksGroupedByGenreAndYear> {
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
}
