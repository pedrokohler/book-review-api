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

export class ExampleBooksGroupedByYear {
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
    type: ExampleBooksGroupedByYear,
  })
  comedy: ExampleBooksGroupedByYear;

  @ApiProperty({
    type: ExampleBooksGroupedByYear,
  })
  action: ExampleBooksGroupedByYear;
}
