import { Module } from '@nestjs/common';
import { BookModule } from './books';

@Module({
  imports: [BookModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
