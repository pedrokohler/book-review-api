import { ApiProperty } from '@nestjs/swagger';

import { IsInt, IsString, Length, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty()
  @IsString()
  @Length(20, 500)
  review: string;

  @ApiProperty()
  @IsInt()
  @Max(10)
  @Min(0)
  rating: number;
}
