import { Module } from '@nestjs/common';
import { BookModule } from './use-cases/aggregates/books-reviews/books';

@Module({
  imports: [BookModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
