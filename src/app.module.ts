import { Module } from '@nestjs/common';
import { BookModule, ReviewModule } from './use-cases/aggregates/books-reviews';

@Module({
  imports: [BookModule, ReviewModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
