import { Module } from '@nestjs/common';
import { BooksReviewsRepository } from 'src/infrastructure/books-reviews-repository.module';
import { BookController } from './book.controller';
import { BookService } from './book.service';

@Module({
  imports: [BooksReviewsRepository],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
