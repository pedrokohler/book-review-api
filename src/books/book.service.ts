import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';

import { IRepository } from 'src/interfaces';
import { IBookParam, IBook, IBookDTO } from './interfaces';
@Injectable()
export class BookService {
  constructor(private readonly bookRepository: IRepository<IBook>) {}

  async createBook(data: IBookDTO): Promise<IBook> {
    const book = this.convertBookDtoToBookParam(data);
    return await this.bookRepository.create(book);
  }

  private convertBookDtoToBookParam(data: IBookDTO): IBookParam {
    return {
      ...data,
      releaseDate: DateTime.fromISO(data.releaseDate).toUTC(),
    };
  }
}
