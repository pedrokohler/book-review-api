import { Body, Controller, Post } from '@nestjs/common';
import { BookService } from './book.service';
import { IBook, IBookDTO } from './interfaces';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async createBook(@Body() data: IBookDTO): Promise<IBook> {
    return await this.bookService.createBook(data);
  }
}
