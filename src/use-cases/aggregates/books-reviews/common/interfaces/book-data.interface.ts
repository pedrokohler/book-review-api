import { ApiProperty } from '@nestjs/swagger';
import { DateTime } from 'luxon';

export class IBookData {
  @ApiProperty()
  bookName: string;

  @ApiProperty()
  author: string;

  @ApiProperty({
    description: 'ISO date string',
    type: String,
  })
  releaseDate: DateTime;

  @ApiProperty()
  genre: string;
}
