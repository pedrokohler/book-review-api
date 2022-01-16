import { Module } from '@nestjs/common';
import { BooksReviewsStorageModule } from 'src/infrastructure/storage';
import { BookController } from './book.controller';
import { BookService } from './book.service';

@Module({
  imports: [BooksReviewsStorageModule],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
