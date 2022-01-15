import { IsString, IsDateString } from 'class-validator';
export class CreateBookDto {
  @IsString()
  bookName: string;

  @IsString()
  author: string;

  @IsDateString()
  releaseDate: string;

  @IsString()
  genre: string;
}
