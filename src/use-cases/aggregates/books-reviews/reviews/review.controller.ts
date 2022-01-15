import { Body, Controller, Param, Post } from '@nestjs/common';
import { IReviewData } from '../common/interfaces/review-data.interface';
import { IReview } from '../common/interfaces/review.interface';
import { ReviewService } from './review.service';

@Controller('books/:bookId/reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  async createReview(
    @Param('bookId') bookId: string,
    @Body() data: IReviewData,
  ): Promise<IReview> {
    return await this.reviewService.createReview({ bookId, data });
  }
}
