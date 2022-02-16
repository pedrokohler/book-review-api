import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';

import {
  IBookData,
  IBook,
  IBooksGroupedByField,
  IBooksGroupedByGenreAndYear,
  IBooksReviewsRepository,
} from '../common/interfaces';
import { CreateBookDto } from './dtos';
import { GroupByOption } from './enums';

@Injectable()
export class BookService {
  constructor(
    private readonly booksReviewsRepository: IBooksReviewsRepository,
  ) {}

  async createBook(data: CreateBookDto): Promise<IBook> {
    const book = this.convertBookDtoToBookParam(data);
    return await this.booksReviewsRepository.createBook(book);
  }

  async findBook(id: string): Promise<IBook> {
    return await this.booksReviewsRepository.findBook(id);
  }

  async getAllBooksGrouped(groupBy: GroupByOption) {
    switch (groupBy) {
      case GroupByOption.GENRE:
        return await this.getAllBooksGroupedByGenre();
      case GroupByOption.GENRE_AND_RELEASE_DATE:
        return await this.getAllBooksGroupedByGenreAndYear();
      default:
        throw new HttpException(
          'Invalid group-by value',
          HttpStatus.BAD_REQUEST,
        );
    }
  }

  private async getAllBooksGroupedByGenre(): Promise<IBooksGroupedByField> {
    return await this.booksReviewsRepository.getAllBooksGroupedByGenre();
  }

  private async getAllBooksGroupedByGenreAndYear(): Promise<IBooksGroupedByGenreAndYear> {
    return await this.booksReviewsRepository.getAllBooksGroupedByGenreAndReleaseDate();
  }

  private convertBookDtoToBookParam(data: CreateBookDto): IBookData {
    return {
      ...data,
      releaseDate: DateTime.fromISO(data.releaseDate).toUTC(),
    };
  }
}
