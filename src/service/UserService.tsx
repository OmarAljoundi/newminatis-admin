import { http } from './httpService'
import axios from 'axios'
import { IUserResponse } from 'interface/IUserResponse'
import { TUser } from 'types/TUser'
import { IBaseResponse } from 'interface/IBaseResponse'
import { SearchQuery } from 'types/TSearchQuery'

class UserService {
    getUsers() {
        return http(axios.create()).get<IUserResponse>(
            `/User/SearchUsers?role=2`
        )
    }
    lookUpUsers(search: SearchQuery) {
        return http(axios.create()).post<IUserResponse>(`/User/LookUp`, search)
    }
    authByEmail(data: TUser) {
        return http(axios.create()).post<IUserResponse>(
            `/User/AuthByEmail`,
            data
        )
    }
    validateAdmin() {
        return http(axios.create()).get<IBaseResponse>(`/User/ValidateAdmin`)
    }
}

export default new UserService()
