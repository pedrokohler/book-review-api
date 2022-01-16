import { Injectable, NotFoundException } from '@nestjs/common';

import {
  IBook,
  IBookRatingsByAuthor,
  IBooksReviewsRepository,
  IReview,
} from '../common/interfaces';
import { CreateReviewDto, DeletedReviewResponseDto } from './dtos';

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
    data: CreateReviewDto;
  }): Promise<IReview> {
    const review = await this.booksReviewsRepository.createReview({
      bookId,
      data,
    });
    if (!review) {
      throw new NotFoundException(`Book with id ${bookId} not found.`);
    }
    return review;
  }

  public async deleteReview({
    bookId,
    reviewId,
  }: {
    bookId: string;
    reviewId: string;
  }): Promise<DeletedReviewResponseDto> {
    const success = await this.booksReviewsRepository.deleteReview({
      bookId,
      reviewId,
    });

    if (!success) {
      throw new NotFoundException(
        "Book or review with given ids weren't found",
      );
    }

    return { success };
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
