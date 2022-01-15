import { Test, TestingModule } from '@nestjs/testing';

import { IRepository } from 'src/interfaces/repository.interface';
import { BookService } from '../book.service';
import { createBookDTO } from './helpers';
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
    const bookDTO = createBookDTO();

    const book = await service.createBook(bookDTO);

    expect(book).toHaveProperty('id');
    expect(book).toHaveProperty('bookName', bookDTO.bookName);
    expect(book).toHaveProperty('author', bookDTO.author);
    expect(book).toHaveProperty('releaseDate');
    expect(book.releaseDate.day).toBe(25);
    expect(book.releaseDate.month).toBe(5);
    expect(book.releaseDate.year).toBe(2016);
    expect(book).toHaveProperty('genre', bookDTO.genre);
  });

  it('should find a previously created book', async () => {
    const bookDTO = createBookDTO();

    const { id } = await service.createBook(bookDTO);

    const book = await service.findBook(id);

    expect(book).toHaveProperty('id');
    expect(book).toHaveProperty('bookName', bookDTO.bookName);
    expect(book).toHaveProperty('author', bookDTO.author);
    expect(book).toHaveProperty('releaseDate');
    expect(book.releaseDate.day).toBe(25);
    expect(book.releaseDate.month).toBe(5);
    expect(book.releaseDate.year).toBe(2016);
    expect(book).toHaveProperty('genre', bookDTO.genre);
  });
});
