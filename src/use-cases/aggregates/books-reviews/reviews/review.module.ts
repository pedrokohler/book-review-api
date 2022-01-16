import { Module } from '@nestjs/common';
import { BooksReviewsStorageModule } from 'src/infrastructure/storage';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

@Module({
  imports: [BooksReviewsStorageModule],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
