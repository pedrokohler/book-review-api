import { ApiProperty } from '@nestjs/swagger';

export class DeletedReviewResponseDto {
  @ApiProperty()
  success: boolean;
}
