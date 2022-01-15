import { Module } from '@nestjs/common';
import { IBooksReviewsRepository } from '../common/interfaces';
import { BookMemoryRepository } from '../common/test/helpers';
import { BookController } from './book.controller';
import { BookService } from './book.service';

@Module({
  imports: [],
  controllers: [BookController],
  providers: [
    BookService,
    { provide: IBooksReviewsRepository, useClass: BookMemoryRepository },
  ],
})
export class BookModule {}
