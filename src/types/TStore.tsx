import { CartItem } from 'store/Model/CartItem'
import { TProduct } from './TProduct'
import { TUser } from './TUser'

export type CartState = {
    CartItems: CartItem[]
}

export type CartAction = {
    type: string
    cartItems: CartItem[]
}

export type DispatchTypeCart = (args: CartAction) => CartAction

export type AuthState = {
    Auth: TUser | null
}

export type AuthAction = {
    type: string
    Auth: TUser
}
