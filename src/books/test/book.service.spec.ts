import { Test, TestingModule } from '@nestjs/testing';
import { DateTime } from 'luxon';

import { IRepository } from 'src/interfaces/repository.interface';
import { BookService } from '../book.service';
import { BookMemoryRepository } from './helpers/book.memory-repository';

describe('BookService', () => {
  let service: BookService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        { provide: IRepository, useClass: BookMemoryRepository },
      ],
    }).compile();

    service = app.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a book', async () => {
    const bookName = 'test title';
    const author = 'test author';
    const releaseDate = DateTime.fromISO('2016-05-25T09:08:34.123');
    const genre = 'test genre';

    const book = await service.createBook({
      bookName,
      author,
      releaseDate,
      genre,
    });

    expect(book).toHaveProperty('id');
    expect(book).toHaveProperty('bookName', bookName);
    expect(book).toHaveProperty('author', author);
    expect(book).toHaveProperty('releaseDate', releaseDate);
    expect(book).toHaveProperty('genre', genre);
  });
});
