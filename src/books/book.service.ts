import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';

import {
  IBookData,
  IBook,
  IBookDTO,
  IBooksGroupedByGenre,
  IBooksGroupedByGenreAndYear,
} from './interfaces';
import { IBookRepository } from './interfaces/book-repository.interface';
@Injectable()
export class BookService {
  constructor(private readonly bookRepository: IBookRepository) {}

  async createBook(data: IBookDTO): Promise<IBook> {
    const book = this.convertBookDtoToBookParam(data);
    return await this.bookRepository.create(book);
  }

  async findBook(id: string): Promise<IBook> {
    return await this.bookRepository.find(id);
  }

  async getAllBooksGroupedByGenre(): Promise<IBooksGroupedByGenre> {
    return await this.bookRepository.getAllGroupedByGenre();
  }

  async getAllBooksGroupedByGenreAndYear(): Promise<IBooksGroupedByGenreAndYear> {
    return await this.bookRepository.getAllGroupedByGenreAndReleaseData();
  }

  private convertBookDtoToBookParam(data: IBookDTO): IBookData {
    return {
      ...data,
      releaseDate: DateTime.fromISO(data.releaseDate).toUTC(),
    };
  }
}
