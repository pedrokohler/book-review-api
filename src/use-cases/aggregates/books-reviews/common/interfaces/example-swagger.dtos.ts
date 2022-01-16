import { ApiProperty } from '@nestjs/swagger';
import { IBook } from './book.interface';

export class ExampleAuthorRatings {
  @ApiProperty()
  'Stephen King': number;

  @ApiProperty()
  'J. R. R. Tolkien': number;
}

export class ExampleBooksGroupedByGenre {
  @ApiProperty({
    type: [IBook],
  })
  action: IBook[];

  @ApiProperty({
    type: [IBook],
  })
  comedy: IBook[];
}

export class ExampleBooksGropedByYear {
  @ApiProperty({
    type: [IBook],
  })
  '2020': IBook[];

  @ApiProperty({
    type: [IBook],
  })
  '1984': IBook[];
}

export class ExampleBooksGroupedByGenreOrGenreAndYear {
  @ApiProperty({
    type: ExampleBooksGropedByYear,
    description: 'Example of books grouped by genre and year',
  })
  comedy: ExampleBooksGropedByYear;

  @ApiProperty({
    type: [IBook],
    description: 'Example of books grouped by genre only',
  })
  action: ExampleBooksGroupedByGenre;
}
