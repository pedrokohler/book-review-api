import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { IBook } from 'src/books/book.interface';
import { IRepository } from 'src/interfaces/repository.interface';

@Injectable()
export class BookMemoryRepository implements IRepository<IBook> {
  private books: IBook[];

  constructor() {
    this.books = [];
  }

  public async create(data: Omit<IBook, 'id'>): Promise<IBook> {
    const id = randomUUID();
    const book: IBook = { id, ...data };
    this.books.push(book);
    return book;
  }

  public async find(id: string): Promise<IBook> {
    const book = this.books.find((book) => book.id === id);
    return book;
  }

  public async update({
    id,
    data,
  }: {
    id: string;
    data: Omit<Partial<IBook>, 'id'>;
  }): Promise<IBook> {
    const bookIndex = this.books.findIndex((book) => book.id === id);
    const currentBook = this.books[bookIndex];
    const updatedBook = {
      ...currentBook,
      ...data,
    };
    this.books[bookIndex] = updatedBook;
    return updatedBook;
  }

  public async delete(id: string): Promise<boolean> {
    const initialLength = this.books.length;
    this.books = this.books.filter((book) => book.id !== id);
    return initialLength !== this.books.length;
  }
}
