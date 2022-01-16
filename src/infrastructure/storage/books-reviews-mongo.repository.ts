import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  IBook,
  IBookData,
  IBooksGroupedByField,
  IBooksGroupedByGenreAndYear,
  IBooksReviewsRepository,
} from 'src/use-cases/aggregates/books-reviews/common/interfaces';
import { IReview } from 'src/use-cases/aggregates/books-reviews/common/interfaces/review.interface';
import { CreateReviewDto } from 'src/use-cases/aggregates/books-reviews/reviews/dtos';
import {
  IAggregationResultForGenreAndYear,
  IAggregationResultForSingleField,
} from './interfaces';
import { Book, BookDocument, Review, ReviewDocument } from './schemas';

@Injectable()
export class BooksReviewsMongoRepository implements IBooksReviewsRepository {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<BookDocument>,
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
  ) {}

  public async createBook(data: IBookData): Promise<IBook> {
    const book = new this.bookModel({ ...data, reviews: [] });
    const savedBook = await book.save();
    return savedBook.toJSON() as unknown as IBook;
  }

  public async findBook(id: string): Promise<IBook> {
    const book = await this.bookModel.findById(id).exec();
    return book as unknown as IBook;
  }

  public async getAllBooksGroupedByGenre(): Promise<IBooksGroupedByField> {
    return this.getAllBooksGroupedByField('genre');
  }

  public async getAllBooksGroupedByAuthor(): Promise<IBooksGroupedByField> {
    return this.getAllBooksGroupedByField('author');
  }

  public async getAllBooksGroupedByGenreAndReleaseDate(): Promise<IBooksGroupedByGenreAndYear> {
    const books = await this.bookModel
      .aggregate([
        {
          $group: {
            _id: {
              genre: '$genre',
              year: {
                $year: '$releaseDate',
              },
            },
            genre: {
              $first: '$genre',
            },
            year: {
              $first: {
                $year: '$releaseDate',
              },
            },
            documents: {
              $push: '$$CURRENT',
            },
          },
        },
      ])
      .exec();
    return books.reduce<IBooksGroupedByGenreAndYear>(
      this.reduceBooksGroupedByAuthorAndReleaseDate.bind(this),
      {},
    );
  }

  public async createReview({
    bookId,
    data,
  }: {
    bookId: string;
    data: CreateReviewDto;
  }): Promise<IReview> {
    const book = await this.findBook(bookId);
    if (!book) {
      return null;
    }

    const review = new this.reviewModel(data);
    const doc = book as unknown as BookDocument;
    doc.reviews.push(review);
    await doc.save();

    return review.toJSON() as unknown as IReview;
  }

  public async deleteReview({
    bookId,
    reviewId,
  }: {
    bookId: string;
    reviewId: string;
  }): Promise<boolean> {
    const book = await this.findBook(bookId);
    if (!book) {
      return false;
    }

    const isReviewInThisBook = book.reviews.some(
      (review) => review.id === reviewId,
    );
    if (!isReviewInThisBook) {
      return false;
    }

    const reviews = book.reviews.filter((review) => review.id !== reviewId);
    const doc = book as unknown as BookDocument;
    doc.reviews = reviews;

    await doc.save();
    return true;
  }

  private async getAllBooksGroupedByField(
    fieldName: string,
  ): Promise<IBooksGroupedByField> {
    const books = await this.bookModel
      .aggregate([
        {
          $group: {
            _id: `$${fieldName}`,
            [fieldName]: {
              $first: `$${fieldName}`,
            },
            documents: {
              $push: '$$CURRENT',
            },
          },
        },
      ])
      .exec();
    return books.reduce<IBooksGroupedByField>(
      this.reduceBooksGroupedByField(fieldName).bind(this),
      {},
    );
  }

  private reduceBooksGroupedByField(fieldName: string) {
    return (
      groupedBooks: IBooksGroupedByField,
      aggregationResult: IAggregationResultForSingleField,
    ) => {
      const fieldValue = aggregationResult[fieldName];
      const { documents } = aggregationResult;
      const previousBooksOfSameField = groupedBooks[fieldValue] ?? [];

      return {
        ...groupedBooks,
        [fieldValue]: [...previousBooksOfSameField, ...documents],
      };
    };
  }

  private reduceBooksGroupedByAuthorAndReleaseDate(
    groupedBooks: IBooksGroupedByGenreAndYear,
    aggregationResult: IAggregationResultForGenreAndYear,
  ) {
    const { genre, year, documents } = aggregationResult;
    const previousBooksOfSameGenre = groupedBooks[genre] ?? {};
    const previousBooksOfSameGenreAndYear = groupedBooks[genre]?.[year] ?? [];

    return {
      ...groupedBooks,
      [genre]: {
        ...previousBooksOfSameGenre,
        [year]: [...previousBooksOfSameGenreAndYear, ...documents],
      },
    };
  }
}
