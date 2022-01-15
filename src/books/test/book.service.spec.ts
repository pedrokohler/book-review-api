import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from '../book.service';

describe('BookService', () => {
  let service: BookService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [BookService],
    }).compile();

    service = app.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
