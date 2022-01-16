import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString } from 'class-validator';
export class CreateBookDto {
  @ApiProperty()
  @IsString()
  bookName: string;

  @ApiProperty()
  @IsString()
  author: string;

  @ApiProperty()
  @IsDateString()
  releaseDate: string;

  @ApiProperty()
  @IsString()
  genre: string;
}
