import { AxiosResponse } from 'axios'
import { IProductReviewResponse } from 'interface/IProductReviewResponse'
import { useState } from 'react'
import ReviewService from 'service/ReviewService'
import { SearchQuery } from 'types/TSearchQuery'

const useReviewService = () => {
    const [ReviewLoader, SetReviewLoader] = useState(false)

    const onSearchReviews = (body: SearchQuery) => {
        SetReviewLoader(true)

        return new Promise((resolve, reject) => {
            ReviewService.search(body)
                .then((res) => {
                    SetReviewLoader(false)
                    resolve(res.data)
                })
                .catch((err) => {
                    SetReviewLoader(false)
                    reject(err)
                })
        })
    }

    const onUpdateReview = (
        id: number,
        status: number
    ): Promise<AxiosResponse<IProductReviewResponse>> => {
        SetReviewLoader(true)
        return new Promise((resolve, reject) => {
            ReviewService.updateStatus(id, status)
                .then((res) => {
                    SetReviewLoader(false)
                    resolve(res)
                })
                .catch((err) => {
                    SetReviewLoader(false)
                    reject(false)
                })
        })
    }

    return {
        onSearchReviews,
        ReviewLoader,
        onUpdateReview,
    }
}

export default useReviewService
