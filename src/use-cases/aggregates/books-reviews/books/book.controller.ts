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
  ExampleBooksGroupedByGenreOrGenreAndYear,
  IBook,
} from '../common/interfaces';
import { BookService } from './book.service';
import { GroupByOption } from './enums/group-by-option.enum';
import { CreateBookDto } from './dtos';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Books')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiCreatedResponse({ type: IBook })
  @Post()
  async createBook(@Body() data: CreateBookDto): Promise<IBook> {
    return await this.bookService.createBook(data);
  }

  @ApiOkResponse({
    type: ExampleBooksGroupedByGenreOrGenreAndYear,
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
