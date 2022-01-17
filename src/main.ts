import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

function setSwaggerApiDocumentation(app) {
  const config = new DocumentBuilder()
    .setTitle('Book Reviews Api')
    .setDescription('Documentation for the book reviews api')
    .setVersion('1.0')
    .addTag('Books')
    .addTag('Reviews')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setSwaggerApiDocumentation(app);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
