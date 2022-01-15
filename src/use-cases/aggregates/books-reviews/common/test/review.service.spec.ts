import { Test, TestingModule } from '@nestjs/testing';

import { ReviewService } from '../../reviews/review.service';
import { IBooksReviewsRepository } from '../interfaces';
import { BookMemoryRepository } from './helpers/book.memory-repository';

describe('ReviewService', () => {
  let service: ReviewService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        { provide: IBooksReviewsRepository, useClass: BookMemoryRepository },
      ],
    }).compile();

    service = app.get<ReviewService>(ReviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
