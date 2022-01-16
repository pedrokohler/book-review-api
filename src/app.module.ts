import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { Configuration } from './common/config.service';
import { BookModule, ReviewModule } from './use-cases/aggregates/books-reviews';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [Configuration.envs],
      cache: true,
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return {
          uri: config.get('mongo.connectionString'),
          dbName: config.get('mongo.databaseName'),
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
      },
      inject: [ConfigService],
    }),
    BookModule,
    ReviewModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
