import { http } from './httpService'
import axios from 'axios'
import { IBlogResponse } from 'interface/IBlogResponse'
import { TBlogs } from 'types/TBlogs'
import { TPublishArticles } from 'types/TPublishArticle'
import { SearchQuery } from 'types/TSearchQuery'

class BlogService {
    create(data: TBlogs) {
        return http(axios.create()).post<IBlogResponse>(`/Blog`, data)
    }

    uploadImages(data: FormData) {
        return http(axios.create()).post<IBlogResponse>(
            `/Blog/UploadImages`,
            data
        )
    }

    uploadSlides(data: FormData) {
        return http(axios.create()).post<IBlogResponse>(
            `/Blog/UploadSlides`,
            data
        )
    }
    getById(id: number) {
        return http(axios.create()).get<IBlogResponse>(`/Blog/${id}`)
    }

    publishArticle(data: TPublishArticles) {
        return http(axios.create()).post<IBlogResponse>(
            `/Blog/PublishArticle`,
            data
        )
    }

    getArticleById(id: number) {
        return http(axios.create()).get<IBlogResponse>(
            `/Blog/GetArticleById/${id}`
        )
    }

    searchArticle(search: SearchQuery) {
        return http(axios.create()).post<IBlogResponse>(
            `/Blog/SearchArticle`,
            search
        )
    }

    searchBlogs(search: SearchQuery) {
        return http(axios.create()).post<IBlogResponse>(
            `/Blog/SearchBlogs`,
            search
        )
    }

    deleteBlog(id: number) {
        return http(axios.create()).delete<any>(`/Blog/${id}`)
    }

    deleteArticle(id: number) {
        return http(axios.create()).delete<any>(`/Blog/Article/${id}`)
    }
}

export default new BlogService()
