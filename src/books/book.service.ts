import { Injectable } from '@nestjs/common';

import { IRepository } from 'src/interfaces/repository.interface';
import { IBook } from './book.interface';

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: IRepository<IBook>) {}

  async createBook(book: Omit<IBook, 'id'>): Promise<IBook> {
    return await this.bookRepository.create(book);
  }
}
