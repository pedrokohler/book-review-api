import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';

import {
  IBookData,
  IBook,
  IBooksGroupedByGenre,
  IBooksGroupedByGenreAndYear,
  IBooksReviewsRepository,
} from '../common/interfaces';
import { IBookDto } from './interfaces';

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: IBooksReviewsRepository) {}

  async createBook(data: IBookDto): Promise<IBook> {
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

  private convertBookDtoToBookParam(data: IBookDto): IBookData {
    return {
      ...data,
      releaseDate: DateTime.fromISO(data.releaseDate).toUTC(),
    };
  }
}
