import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';

import { IRepository } from 'src/interfaces/repository.interface';
import { IBookParam } from './interfaces';
import { BookDTO } from './interfaces/book.dto.interface';
import { IBook } from './interfaces/book.interface';

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: IRepository<IBook>) {}

  async createBook(data: BookDTO): Promise<IBook> {
    const book: IBookParam = {
      ...data,
      releaseDate: DateTime.fromISO(data.releaseDate).toUTC(),
    };
    return await this.bookRepository.create(book);
  }
}
