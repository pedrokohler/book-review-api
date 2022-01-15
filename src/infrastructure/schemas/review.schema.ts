import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReviewDocument = Review & Document;

@Schema({
  toJSON: {
    transform: (_, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class Review {
  @Prop({
    type: String,
    required: true,
  })
  review: string;

  @Prop({
    type: Number,
    required: true,
  })
  rating: number;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
