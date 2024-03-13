import { TBlogs } from 'types/TBlogs'
import { TPublishArticles } from 'types/TPublishArticle'
import { IBaseResponse } from './IBaseResponse'

export interface IBlogResponse extends IBaseResponse {
    blog: TBlogs
    blogs: TBlogs[]
    publishArticle: TPublishArticles
    publishArticles: TPublishArticles[]
    total: number
}
