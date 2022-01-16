import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  ExampleAuthorRatings,
  IBookRatingsByAuthor,
} from '../common/interfaces';
import { IReview } from '../common/interfaces/review.interface';
import { CreateReviewDto, DeletedReviewResponseDto } from './dtos';
import { ReviewService } from './review.service';

@ApiTags('Reviews')
@Controller()
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiCreatedResponse({ type: IReview })
  @Post('books/:bookId/reviews')
  async createReview(
    @Param('bookId') bookId: string,
    @Body() data: CreateReviewDto,
  ): Promise<IReview> {
    return await this.reviewService.createReview({ bookId, data });
  }

  @ApiOkResponse({ type: ExampleAuthorRatings })
  @Get('books/reviews/sum')
  async getSumOfRatingsGroupedByAuthor(): Promise<IBookRatingsByAuthor> {
    return await this.reviewService.getSumOfRatingsGroupedByAuthor();
  }

  @Delete('books/:bookId/reviews/:reviewId')
  async deleteReview(
    @Param('bookId') bookId: string,
    @Param('reviewId') reviewId: string,
  ): Promise<DeletedReviewResponseDto> {
    return await this.reviewService.deleteReview({ bookId, reviewId });
  }
}
