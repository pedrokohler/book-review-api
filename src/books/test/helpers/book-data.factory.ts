import { IBookDTO } from 'src/books/interfaces';

export function createBookDTO(data?: Partial<IBookDTO>): IBookDTO {
  return {
    bookName: 'test title',
    author: 'test author',
    releaseDate: '2016-05-25T09:08:34.123',
    genre: 'test genre',
    ...(data || {}),
  };
}
