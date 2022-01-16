import { CreateBookDto } from '../../books/dtos';

export function createBookDto(data?: Partial<CreateBookDto>): CreateBookDto {
  return {
    bookName: 'test title',
    author: 'test author',
    releaseDate: '2016-05-25T09:08:34.123',
    genre: 'test genre',
    ...(data || {}),
  };
}
