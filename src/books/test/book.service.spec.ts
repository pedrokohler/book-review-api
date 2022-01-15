import { Test, TestingModule } from '@nestjs/testing';

import { BookService } from '../book.service';
import { IBookRepository } from '../interfaces/book-repository.interface';
import { createBookDTO } from './helpers';
import { BookMemoryRepository } from './helpers/book.memory-repository';

describe('BookService', () => {
  let service: BookService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        { provide: IBookRepository, useClass: BookMemoryRepository },
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

  it('should get all books grouped by genre', async () => {
    const bookDTO = createBookDTO();

    await service.createBook({ ...bookDTO, genre: 'Comedy' });
    await service.createBook({ ...bookDTO, genre: 'Comedy' });
    await service.createBook({ ...bookDTO, genre: 'Thriller' });
    await service.createBook({ ...bookDTO, genre: 'Comedy' });

    const booksGroupeByGenre = await service.getAllBooksGroupedByGenre();

    expect(booksGroupeByGenre).toHaveProperty('Comedy');
    expect(booksGroupeByGenre).toHaveProperty('Thriller');
    expect(booksGroupeByGenre['Comedy']).toHaveLength(3);
    expect(booksGroupeByGenre['Thriller']).toHaveLength(1);
  });

  it('should get all books grouped by genre and year', async () => {
    const bookDTO = createBookDTO();

    await service.createBook({
      ...bookDTO,
      genre: 'Comedy',
      releaseDate: '2016-05-25T09:08:34.123',
    });
    await service.createBook({
      ...bookDTO,
      genre: 'Comedy',
      releaseDate: '2016-05-25T09:08:34.123',
    });
    await service.createBook({
      ...bookDTO,
      genre: 'Comedy',
      releaseDate: '2015-05-25T09:08:34.123',
    });
    await service.createBook({
      ...bookDTO,
      genre: 'Comedy',
      releaseDate: '2015-05-25T09:08:34.123',
    });
    await service.createBook({
      ...bookDTO,
      genre: 'Thriller',
      releaseDate: '2016-05-25T09:08:34.123',
    });
    await service.createBook({
      ...bookDTO,
      genre: 'Thriller',
      releaseDate: '2018-05-25T09:08:34.123',
    });
    await service.createBook({
      ...bookDTO,
      genre: 'Thriller',
      releaseDate: '2018-05-25T09:08:34.123',
    });
    await service.createBook({
      ...bookDTO,
      genre: 'Comedy',
      releaseDate: '2019-05-25T09:08:34.123',
    });

    const booksGroupeByGenreAndYear =
      await service.getAllBooksGroupedByGenreAndYear();

    expect(booksGroupeByGenreAndYear).toHaveProperty('Comedy');
    expect(booksGroupeByGenreAndYear).toHaveProperty('Thriller');
    expect(booksGroupeByGenreAndYear['Comedy']).toHaveProperty('2015');
    expect(booksGroupeByGenreAndYear['Comedy']).toHaveProperty('2016');
    expect(booksGroupeByGenreAndYear['Comedy']).toHaveProperty('2019');
    expect(booksGroupeByGenreAndYear['Thriller']).toHaveProperty('2016');
    expect(booksGroupeByGenreAndYear['Thriller']).toHaveProperty('2018');

    expect(booksGroupeByGenreAndYear['Comedy']['2015']).toHaveLength(2);
    expect(booksGroupeByGenreAndYear['Comedy']['2016']).toHaveLength(2);
    expect(booksGroupeByGenreAndYear['Comedy']['2019']).toHaveLength(1);
    expect(booksGroupeByGenreAndYear['Thriller']['2016']).toHaveLength(1);
    expect(booksGroupeByGenreAndYear['Thriller']['2018']).toHaveLength(2);
  });
});
