import { Injectable } from '@nestjs/common';
import { IBooksReviewsRepository } from '../common/interfaces';
import { IReviewData } from '../common/interfaces/review-data.interface';
import { IReview } from '../common/interfaces/review.interface';

@Injectable()
export class ReviewService {
  constructor(
    private readonly booksReviewsRepository: IBooksReviewsRepository,
  ) {}

  async createReview({
    bookId,
    data,
  }: {
    bookId: string;
    data: IReviewData;
  }): Promise<IReview> {
    return await this.booksReviewsRepository.createReview({
      bookId,
      data,
    });
  }

  async deleteReview({
    bookId,
    reviewId,
  }: {
    bookId: string;
    reviewId: string;
  }): Promise<boolean> {
    return await this.booksReviewsRepository.deleteReview({
      bookId,
      reviewId,
    });
  }
}
