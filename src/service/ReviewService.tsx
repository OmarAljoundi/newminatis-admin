import { http } from './httpService'
import axios from 'axios'
import { SearchQuery } from 'types/TSearchQuery'
import { IProductReviewResponse } from 'interface/IProductReviewResponse'

class ReviewService {
    search(data: SearchQuery) {
        return http(axios.create()).post<IProductReviewResponse>(
            `Review/Search`,
            data
        )
    }

    getById(id: number) {
        return http(axios.create()).get<IProductReviewResponse>(`Review/${id}`)
    }

    updateStatus(id: number, status: number) {
        return http(axios.create()).put<IProductReviewResponse>(
            `Review?id=${id}&status=${status}`
        )
    }
}

export default new ReviewService()
