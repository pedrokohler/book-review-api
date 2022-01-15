import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';

import { ReviewService } from '../../reviews/review.service';
import { IBooksReviewsRepository } from '../interfaces';
import {
  createBookDto,
  BooksReviewsMemoryRepository,
  createReviewData,
} from './helpers';

describe('ReviewService', () => {
  let service: ReviewService;
  let repository: IBooksReviewsRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        {
          provide: IBooksReviewsRepository,
          useClass: BooksReviewsMemoryRepository,
        },
      ],
    }).compile();

    repository = app.get<IBooksReviewsRepository>(IBooksReviewsRepository);
    service = app.get<ReviewService>(ReviewService);

    repository['books'] = [
      { id: '1', ...createBookDto({ author: 'Stephen King' }), reviews: [] },
      { id: '2', ...createBookDto({ author: 'Stephen King' }), reviews: [] },
      { id: '3', ...createBookDto({ author: 'George Orwell' }), reviews: [] },
      { id: '4', ...createBookDto({ author: 'George Orwell' }), reviews: [] },
      { id: '5', ...createBookDto({ author: 'Stephen King' }), reviews: [] },
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

  describe('delete reviews', () => {
    it('should delete the correct review', async () => {
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

    it('should return {success: true} if review is deleted', async () => {
      const reviewData = createReviewData();

      const review = await service.createReview({
        bookId: '1',
        data: reviewData,
      });
      const response = await service.deleteReview({
        reviewId: review.id,
        bookId: '1',
      });
      expect(response).toEqual({ success: true });
    });

    it('should return throw error if review is not deleted', async () => {
      const reviewData = createReviewData();

      const review = await service.createReview({
        bookId: '1',
        data: reviewData,
      });

      try {
        await service.deleteReview({
          reviewId: randomUUID(),
          bookId: '1',
        });
      } catch (e) {
        expect(e).toBeDefined();
      }

      try {
        await service.deleteReview({
          reviewId: review.id,
          bookId: '2',
        });
      } catch (e) {
        expect(e).toBeDefined();
      }

      expect.assertions(2);
    });
  });

  it('should get sum of ratings grouped by author', async () => {
    const reviewData = createReviewData();

    await service.createReview({ bookId: '1', data: reviewData });
    await service.createReview({ bookId: '1', data: reviewData });
    await service.createReview({ bookId: '2', data: reviewData });
    await service.createReview({ bookId: '2', data: reviewData });
    await service.createReview({ bookId: '2', data: reviewData });
    await service.createReview({ bookId: '3', data: reviewData });
    await service.createReview({ bookId: '4', data: reviewData });
    await service.createReview({ bookId: '4', data: reviewData });
    await service.createReview({ bookId: '4', data: reviewData });
    await service.createReview({ bookId: '4', data: reviewData });
    await service.createReview({ bookId: '4', data: reviewData });

    const sumOfRatingsGroupedByAuthor =
      await service.getSumOfRatingsGroupedByAuthor();

    expect(sumOfRatingsGroupedByAuthor).toHaveProperty('Stephen King');
    expect(sumOfRatingsGroupedByAuthor).toHaveProperty('George Orwell');
    expect(sumOfRatingsGroupedByAuthor['Stephen King']).toBe(50);
    expect(sumOfRatingsGroupedByAuthor['George Orwell']).toBe(60);
  });
});
