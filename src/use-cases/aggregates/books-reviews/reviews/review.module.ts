import { Module } from '@nestjs/common';
import { IBooksReviewsRepository } from '../common/interfaces';
import { BookMemoryRepository } from '../common/test/helpers';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

@Module({
  imports: [],
  controllers: [ReviewController],
  providers: [
    ReviewService,
    { provide: IBooksReviewsRepository, useClass: BookMemoryRepository },
  ],
})
export class ReviewModule {}
