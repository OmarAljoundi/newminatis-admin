import { TOrderDto, TOrderItemsDto } from 'types/TOrder'
import { TUserAddress } from 'types/TUserAddress'
import { IBaseResponse } from './IBaseResponse'

export interface IOrderResponse extends IBaseResponse {
    depoterOrderId: string
    edd: string
    orderReviewItems: OrderReviewItems[]
    total: number
    userAddress: TUserAddress
    orderDetailsDto: TOrderDto[]
    orderItemsDto: TOrderItemsDto
}

export type OrderReviewItems = {
    productName: string
    size: string
    quantity: number
    price: number
}
