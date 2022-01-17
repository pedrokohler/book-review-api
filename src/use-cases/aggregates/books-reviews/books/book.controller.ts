import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
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
    switch (groupBy) {
      case GroupByOption.GENRE:
        return await this.bookService.getAllBooksGroupedByGenre();
      case GroupByOption.GENRE_AND_RELEASE_DATE:
        return await this.bookService.getAllBooksGroupedByGenreAndYear();
      default:
        throw new HttpException(
          'Invalid group-by value',
          HttpStatus.BAD_REQUEST,
        );
    }
  }
}
