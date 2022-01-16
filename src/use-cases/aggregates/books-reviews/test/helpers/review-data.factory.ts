import { IReviewData } from '../../common/interfaces/review-data.interface';

export function createReviewData(data?: Partial<IReviewData>): IReviewData {
  return {
    review: 'test review',
    rating: 10,
    ...(data || {}),
  };
}
