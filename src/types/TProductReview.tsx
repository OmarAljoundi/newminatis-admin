import { TProduct } from './TProduct'
import { TUser } from './TUser'

export type TProductReviewDto = {
    id: number
    userId: number
    productId: number
    stars: number
    review: string
    status: number
    helpful: number
    notHelpful: number
    productImage: string
    productName: string
    userEmail: string
    createdDate: Date
}

export type TProductReview = {
    id: number
    userId: number
    productId: number
    stars: number
    review: string
    status: number
    helpful: number
    notHelpful: number
    user: TUser
    product: TProduct
    createdDate: Date
}

export enum eReviewStatus {
    WaitingForApproval = 0,
    Approved = 1,
    Rejected = 2,
}
