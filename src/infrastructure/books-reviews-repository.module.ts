import { Module } from '@nestjs/common';
import { IBooksReviewsRepository } from 'src/use-cases/aggregates/books-reviews/common/interfaces';
import { BookMemoryRepository } from 'src/use-cases/aggregates/books-reviews/common/test/helpers';

@Module({
  imports: [],
  controllers: [],
  providers: [
    { provide: IBooksReviewsRepository, useClass: BookMemoryRepository },
  ],
  exports: [IBooksReviewsRepository],
})
export class BooksReviewsRepository {}
