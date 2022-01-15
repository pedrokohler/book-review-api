import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';

import { IRepository } from 'src/interfaces';
import { IBookData, IBook, IBookDTO } from './interfaces';
@Injectable()
export class BookService {
  constructor(private readonly bookRepository: IRepository<IBookData, IBook>) {}

  async createBook(data: IBookDTO): Promise<IBook> {
    const book = this.convertBookDtoToBookParam(data);
    return await this.bookRepository.create(book);
  }

  async findBook(id: string): Promise<IBook> {
    return await this.bookRepository.find(id);
  }

  private convertBookDtoToBookParam(data: IBookDTO): IBookData {
    return {
      ...data,
      releaseDate: DateTime.fromISO(data.releaseDate).toUTC(),
    };
  }
}
