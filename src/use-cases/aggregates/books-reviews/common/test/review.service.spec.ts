import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';

import { ReviewService } from '../../reviews/review.service';
import { IBooksReviewsRepository } from '../interfaces';
import { createBookDto } from './helpers';
import { BookMemoryRepository } from './helpers/book.memory-repository';
import { createReviewData } from './helpers/review-data.factory';

describe('ReviewService', () => {
  let service: ReviewService;
  let repository: IBooksReviewsRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        { provide: IBooksReviewsRepository, useClass: BookMemoryRepository },
      ],
    }).compile();

    repository = app.get<IBooksReviewsRepository>(IBooksReviewsRepository);
    service = app.get<ReviewService>(ReviewService);

    repository['books'] = [
      { id: '1', ...createBookDto(), reviews: [] },
      { id: '2', ...createBookDto(), reviews: [] },
      { id: '3', ...createBookDto(), reviews: [] },
    ];
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add reviews to the correct book', async () => {
    const reviewData = createReviewData();

    const review = await service.createReview({
      bookId: '1',
      data: reviewData,
    });

    expect(review).toHaveProperty('review', reviewData.review);
    expect(review).toHaveProperty('rating', reviewData.rating);
    expect(repository['books'][0]['reviews']).toHaveLength(1);
    expect(repository['books'][1]['reviews']).toHaveLength(0);
    expect(repository['books'][2]['reviews']).toHaveLength(0);

    await service.createReview({
      bookId: '1',
      data: reviewData,
    });
    expect(repository['books'][0]['reviews']).toHaveLength(2);

    await service.createReview({
      bookId: '2',
      data: reviewData,
    });
    expect(repository['books'][1]['reviews']).toHaveLength(1);
  });

  it('should delete the correct', async () => {
    const reviewData = createReviewData();

    const review = await service.createReview({
      bookId: '1',
      data: reviewData,
    });

    await service.createReview({
      bookId: '1',
      data: reviewData,
    });

    await service.createReview({
      bookId: '2',
      data: reviewData,
    });

    await service.deleteReview({ reviewId: review.id, bookId: '1' });
    expect(repository['books'][0]['reviews']).toHaveLength(1);
    expect(repository['books'][1]['reviews']).toHaveLength(1);
  });

  it('should return true if review is deleted', async () => {
    const reviewData = createReviewData();

    const review = await service.createReview({
      bookId: '1',
      data: reviewData,
    });
    const wasDeleted = await service.deleteReview({
      reviewId: review.id,
      bookId: '1',
    });
    expect(wasDeleted).toBe(true);
  });

  it('should return false if review is not deleted', async () => {
    const reviewData = createReviewData();

    const review = await service.createReview({
      bookId: '1',
      data: reviewData,
    });
    const wasDeletedWithWrongReviewId = await service.deleteReview({
      reviewId: randomUUID(),
      bookId: '1',
    });
    expect(wasDeletedWithWrongReviewId).toBe(false);

    const wasDeleteWithWrongBookId = await service.deleteReview({
      reviewId: review.id,
      bookId: '2',
    });
    expect(wasDeleteWithWrongBookId).toBe(false);
  });
});
