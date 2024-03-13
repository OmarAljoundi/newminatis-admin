import { http } from './httpService'
import axios from 'axios'
import { IProductResponse } from 'interface/IProductResponse'
import { SearchQuery } from 'types/TSearchQuery'
import { IOrderResponse } from 'interface/IOrderResponse'

class OrderService {
    search(data: SearchQuery) {
        return http(axios.create()).post<IOrderResponse>(`/Order/Search`, data)
    }

    getById(id: number) {
        return http(axios.create()).get<IOrderResponse>(`/Order/${id}`)
    }
    exportExcel() {
        return http(axios.create()).get<Blob>(`/Order/ExportToExcel`)
    }
}

export default new OrderService()
