import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { IBook } from '../common/interfaces';
import { BookService } from './book.service';
import { GroupByOption } from './enums/group-by-option.enum';
import { IBookDto } from './interfaces';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async createBook(@Body() data: IBookDto): Promise<IBook> {
    return await this.bookService.createBook(data);
  }

  @Get()
  async getAllBooksGrouped(@Query('group-by') groupBy: GroupByOption) {
    switch (groupBy) {
      case GroupByOption.GENRE:
        return await this.bookService.getAllBooksGroupedByGenre();
      case GroupByOption.GENRE_AND_RELEASE_DATE:
        return await this.bookService.getAllBooksGroupedByGenreAndYear();
      default:
        throw new HttpException(
          'Invalid groupBy value',
          HttpStatus.BAD_REQUEST,
        );
    }
  }
}
