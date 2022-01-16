import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DateTime } from 'luxon';
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
    const book = await this.bookModel.findById(id).populate('reviews').exec();
    return book as unknown as IBook;
  }

  public async getAllBooksGroupedByGenre(): Promise<IBooksGroupedByField> {
    return this.getAllBooksGroupedByField('genre');
  }

  public async getAllBooksGroupedByAuthor(): Promise<IBooksGroupedByField> {
    return this.getAllBooksGroupedByField('author');
  }

  public async getAllBooksGroupedByGenreAndReleaseDate(): Promise<IBooksGroupedByGenreAndYear> {
    const books = await this.bookModel.find().populate('reviews').exec();
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
    await review.save();
    await doc.save();
    return review as unknown as IReview;
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

    const bookHasReview = book.reviews.some((review) => review.id === reviewId);
    if (!bookHasReview) {
      return false;
    }

    const review = await this.reviewModel.deleteOne({ _id: reviewId }).exec();
    if (!review) {
      return false;
    }

    const doc = book as unknown as BookDocument;
    doc.reviews = book.reviews.filter((review) => review.id !== reviewId);
    await doc.save();
    return true;
  }

  private async getAllBooksGroupedByField(
    fieldName: string,
  ): Promise<IBooksGroupedByField> {
    const books = await this.bookModel.find().populate('reviews').exec();
    return books.reduce<IBooksGroupedByField>(
      this.reduceBooksGroupedByField(fieldName).bind(this),
      {},
    );
  }

  private reduceBooksGroupedByField(fieldName: string) {
    return (groupedBooks, book) => {
      const fieldValue = book[fieldName];
      const booksOfSameGenre = groupedBooks[fieldValue] || [];
      return {
        ...groupedBooks,
        [fieldValue]: [...booksOfSameGenre, book],
      };
    };
  }

  private reduceBooksGroupedByAuthorAndReleaseDate(groupedBooks, book) {
    const { genre, releaseDate } = book;
    const { year } = DateTime.fromJSDate(releaseDate as unknown as Date);
    const booksOfSameGenre = groupedBooks[genre] || {};
    const booksOfSameGenreAndYear = groupedBooks[genre]?.[year] || [];
    return {
      ...groupedBooks,
      [genre]: {
        ...booksOfSameGenre,
        [year]: [...booksOfSameGenreAndYear, book as unknown as IBook],
      },
    };
  }
}
