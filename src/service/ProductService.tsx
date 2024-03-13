import { http } from './httpService'
import axios from 'axios'
import { TProduct, UpdateSaleRequest } from 'types/TProduct'
import { IProductResponse } from 'interface/IProductResponse'
import { TProductCategory } from 'types/TProductCategory'
import { TProductTags } from 'types/TProductTags'
import { SearchQuery } from 'types/TSearchQuery'
import { IStockResponse, TStockRequest } from 'types/TStockRequest'

class ProductService {
    create(data: TProduct) {
        return http(axios.create()).post<IProductResponse>(`/Product`, data)
    }
    updateSale(data: UpdateSaleRequest) {
        return http(axios.create()).post<IProductResponse>(
            `/Product/UpdateSale`,
            data
        )
    }

    uploadImages(data: FormData) {
        return http(axios.create()).post<IProductResponse>(
            `/Product/Upload`,
            data
        )
    }
    uploadCategoryImages(data: FormData) {
        return http(axios.create()).post<IProductResponse>(
            `/Product/UploadCategoryImage`,
            data
        )
    }

    getCategories() {
        return http(axios.create()).get<TProductCategory[]>(`/Product/Category`)
    }

    removeCategories(id: number) {
        return http(axios.create()).delete<any>(`/Product/Category/${id}`)
    }

    postCategory(data: TProductCategory) {
        return http(axios.create()).post<TProductCategory>(
            `/Product/Category`,
            data
        )
    }

    search() {
        return http(axios.create()).get<IProductResponse>(`/Product/Search`)
    }

    searchShop(search: SearchQuery) {
        return http(axios.create()).post<IProductResponse>(
            `/Product/SearchShop`,
            search
        )
    }
    getById(id: number) {
        return http(axios.create()).get<IProductResponse>(`/Product/${id}`)
    }
    getTags() {
        return http(axios.create()).get<TProductTags[]>(`/Product/Tags`)
    }
    getQuantity(stock: TStockRequest) {
        return http(axios.create()).post<IStockResponse>(
            '/External/Stock',
            stock
        )
    }
}

export default new ProductService()
