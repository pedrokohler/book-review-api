import { Module } from '@nestjs/common';
import { BooksReviewsRepository } from 'src/infrastructure/books-reviews-persistence.module';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

@Module({
  imports: [BooksReviewsRepository],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
