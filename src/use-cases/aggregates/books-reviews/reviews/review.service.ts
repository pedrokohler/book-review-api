import { Injectable } from '@nestjs/common';
import {
  IBook,
  IBookRatingsByAuthor,
  IBooksReviewsRepository,
} from '../common/interfaces';
import { IReviewData } from '../common/interfaces/review-data.interface';
import { IReview } from '../common/interfaces/review.interface';

@Injectable()
export class ReviewService {
  constructor(
    private readonly booksReviewsRepository: IBooksReviewsRepository,
  ) {}

  public async createReview({
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

  public async deleteReview({
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

  public async getSumOfRatingsGroupedByAuthor(): Promise<IBookRatingsByAuthor> {
    const booksGroupedByAuthor =
      await this.booksReviewsRepository.getAllBooksGroupedByAuthor();

    const ratingsGroupedByAuthor = Object.entries(
      booksGroupedByAuthor,
    ).reduce<IBookRatingsByAuthor>(
      this.reduceBookRatingsByAuthor.bind(this),
      {},
    );

    return ratingsGroupedByAuthor;
  }

  private reduceBookRatingsByAuthor(
    ratingsByAuthor: IBookRatingsByAuthor,
    [author, authorBooks]: [string, IBook[]],
  ): IBookRatingsByAuthor {
    const sumOfAuthorRatings = authorBooks.reduce<number>(
      (total, book) => total + this.getSumOfBookRatings(book),
      0,
    );
    return {
      ...ratingsByAuthor,
      [author]: sumOfAuthorRatings,
    };
  }

  private getSumOfBookRatings(book: IBook): number {
    const sum = book.reviews.reduce(
      (ratings, review) => ratings + review.rating,
      0,
    );
    return sum;
  }
}
