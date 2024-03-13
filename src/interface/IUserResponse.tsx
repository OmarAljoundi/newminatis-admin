import { TUser } from 'types/TUser'
import { TUserAddress } from 'types/TUserAddress'
import { IBaseResponse } from './IBaseResponse'

export interface IUserResponse extends IBaseResponse {
    user: TUser
    users: TUser[]
    userAddresses: TUserAddress[]
    token: string
    total: number
}
