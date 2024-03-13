import { TProductReview, TProductReviewDto } from 'types/TProductReview'
import { IBaseResponse } from './IBaseResponse'

export interface IProductReviewResponse extends IBaseResponse {
    productReview: TProductReview
    productReviews: TProductReview[]
    productReviewsDto: TProductReviewDto[]
    productReviewDto: TProductReviewDto
    total: number
}
