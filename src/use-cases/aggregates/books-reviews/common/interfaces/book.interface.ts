import { ApiProperty } from '@nestjs/swagger';

import { IBookData } from './book-data.interface';
import { IReview } from './review.interface';

export class IBook extends IBookData {
  @ApiProperty()
  id: string;

  @ApiProperty({
    type: [IReview],
  })
  reviews: IReview[];
}
