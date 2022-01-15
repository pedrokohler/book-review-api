import { Body, Controller, Post } from '@nestjs/common';
import { IBook } from '../common/interfaces';
import { BookService } from './book.service';
import { IBookDto } from './interfaces';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async createBook(@Body() data: IBookDto): Promise<IBook> {
    return await this.bookService.createBook(data);
  }
}
