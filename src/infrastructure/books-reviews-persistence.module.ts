import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IBooksReviewsRepository } from 'src/use-cases/aggregates/books-reviews/common/interfaces';
import { BooksReviewsMongoRepository } from './books-reviews-mongo.repository';
import { Book, BookSchema, Review, ReviewSchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Book.name, schema: BookSchema },
      { name: Review.name, schema: ReviewSchema },
    ]),
  ],
  controllers: [],
  providers: [
    { provide: IBooksReviewsRepository, useClass: BooksReviewsMongoRepository },
  ],
  exports: [IBooksReviewsRepository],
})
export class BooksReviewsRepository {}
