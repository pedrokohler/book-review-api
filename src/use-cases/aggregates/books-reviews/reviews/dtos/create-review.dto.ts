import { IsInt, IsString, Length, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  @Length(20, 500)
  review: string;

  @IsInt()
  @Max(10)
  @Min(0)
  rating: number;
}
