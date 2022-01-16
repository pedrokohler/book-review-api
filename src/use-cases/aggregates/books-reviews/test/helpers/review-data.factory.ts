import { IReviewData } from '../../common/interfaces';

export function createReviewData(data?: Partial<IReviewData>): IReviewData {
  return {
    review: 'test review',
    rating: 10,
    ...(data || {}),
  };
}
