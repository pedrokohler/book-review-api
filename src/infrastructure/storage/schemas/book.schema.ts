import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Review, ReviewSchema } from './review.schema';

export type BookDocument = Book & mongoose.Document;

@Schema({
  toJSON: {
    transform: (_, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class Book {
  @Prop({
    type: String,
    required: true,
  })
  bookName: string;

  @Prop({
    type: String,
    required: true,
  })
  author: string;

  @Prop({
    type: Date,
    required: true,
  })
  releaseDate: string;

  @Prop({
    type: String,
    required: true,
  })
  genre: string;

  @Prop({
    type: [ReviewSchema],
    ref: 'Review',
    required: true,
  })
  reviews: Review[];
}

export const BookSchema = SchemaFactory.createForClass(Book);
