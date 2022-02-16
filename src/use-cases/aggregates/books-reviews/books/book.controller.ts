import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  refs,
} from '@nestjs/swagger';

import {
  ExampleBooksGroupedByGenre,
  ExampleBooksGroupedByGenreOrGenreAndYear,
  IBook,
} from '../common/interfaces';
import { BookService } from './book.service';
import { GroupByOption } from './enums';
import { CreateBookDto } from './dtos';
@ApiTags('Books')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiCreatedResponse({ type: IBook })
  @Post()
  async createBook(@Body() data: CreateBookDto): Promise<IBook> {
    return await this.bookService.createBook(data);
  }

  @ApiExtraModels(
    ExampleBooksGroupedByGenreOrGenreAndYear,
    ExampleBooksGroupedByGenre,
  )
  @ApiOkResponse({
    schema: {
      oneOf: refs(
        ExampleBooksGroupedByGenreOrGenreAndYear,
        ExampleBooksGroupedByGenre,
      ),
    },
  })
  @ApiQuery({ name: 'group-by', enum: GroupByOption })
  @Get()
  async getAllBooksGrouped(@Query('group-by') groupBy: GroupByOption) {
    return this.bookService.getAllBooksGrouped(groupBy);
  }
}
