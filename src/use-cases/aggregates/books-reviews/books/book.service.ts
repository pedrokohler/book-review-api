import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';

import {
  IBookData,
  IBook,
  IBooksGroupedByField,
  IBooksGroupedByGenreAndYear,
  IBooksReviewsRepository,
} from '../common/interfaces';
import { IBookDto } from './interfaces';

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: IBooksReviewsRepository) {}

  async createBook(data: IBookDto): Promise<IBook> {
    const book = this.convertBookDtoToBookParam(data);
    return await this.bookRepository.createBook(book);
  }

  async findBook(id: string): Promise<IBook> {
    return await this.bookRepository.findBook(id);
  }

  async getAllBooksGroupedByGenre(): Promise<IBooksGroupedByField> {
    return await this.bookRepository.getAllBooksGroupedByGenre();
  }

  async getAllBooksGroupedByGenreAndYear(): Promise<IBooksGroupedByGenreAndYear> {
    return await this.bookRepository.getAllBooksGroupedByGenreAndReleaseData();
  }

  private convertBookDtoToBookParam(data: IBookDto): IBookData {
    return {
      ...data,
      releaseDate: DateTime.fromISO(data.releaseDate).toUTC(),
    };
  }
}
