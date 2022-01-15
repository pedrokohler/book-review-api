import { IReviewData } from '../../interfaces/review-data.interface';

export function createReviewData(data?: Partial<IReviewData>): IReviewData {
  return {
    review: 'test review',
    rating: 10,
    ...(data || {}),
  };
}
