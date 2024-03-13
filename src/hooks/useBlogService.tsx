import { useState } from 'react'
import BlogService from 'service/BlogService'
import { TBlogs } from 'types/TBlogs'
import { TPublishArticles } from 'types/TPublishArticle'
import { SearchQuery } from 'types/TSearchQuery'

const useBlogService = () => {
    const [BlogLoader, setBlogLoader] = useState(false)

    const onCreateBlog = (body: TBlogs) => {
        setBlogLoader(true)
        return new Promise((resolve, reject) => {
            BlogService.create(body)
                .then((res) => {
                    setBlogLoader(false)
                    resolve(res.data)
                })
                .catch((err) => {
                    setBlogLoader(false)
                    reject(err)
                })
        })
    }

    const GetById = (id: number) => {
        setBlogLoader(true)

        return new Promise((resolve, reject) => {
            BlogService.getById(id)
                .then((res) => {
                    setBlogLoader(false)
                    resolve(res.data)
                })
                .catch((err) => {
                    setBlogLoader(false)
                    reject(err)
                })
        })
    }

    const onUploadImages = (data: FormData) => {
        setBlogLoader(true)
        return new Promise((resolve, reject) => {
            BlogService.uploadImages(data)
                .then((res) => {
                    setBlogLoader(false)
                    resolve(res.data)
                })
                .catch((err) => {
                    setBlogLoader(false)
                    reject(err)
                })
        })
    }

    const onUploadSlides = (data: FormData) => {
        setBlogLoader(true)
        return new Promise((resolve, reject) => {
            BlogService.uploadSlides(data)
                .then((res) => {
                    setBlogLoader(false)
                    resolve(res.data)
                })
                .catch((err) => {
                    setBlogLoader(false)
                    reject(err)
                })
        })
    }

    const onPublishArticle = (data: TPublishArticles) => {
        setBlogLoader(true)
        return new Promise((resolve, reject) => {
            BlogService.publishArticle(data)
                .then((res) => {
                    setBlogLoader(false)
                    resolve(res.data)
                })
                .catch((err) => {
                    setBlogLoader(false)
                    reject(err)
                })
        })
    }

    const onGetArticle = (id: number) => {
        setBlogLoader(true)
        return new Promise((resolve, reject) => {
            BlogService.getArticleById(id)
                .then((res) => {
                    setBlogLoader(false)
                    resolve(res.data)
                })
                .catch((err) => {
                    setBlogLoader(false)
                    reject(err)
                })
        })
    }

    const onSearchArticle = (search: SearchQuery) => {
        setBlogLoader(true)
        return new Promise((resolve, reject) => {
            BlogService.searchArticle(search)
                .then((res) => {
                    setBlogLoader(false)
                    resolve(res.data)
                })
                .catch((err) => {
                    setBlogLoader(false)
                    reject(err)
                })
        })
    }

    const onSearchBlog = (search: SearchQuery) => {
        setBlogLoader(true)
        return new Promise((resolve, reject) => {
            BlogService.searchBlogs(search)
                .then((res) => {
                    setBlogLoader(false)
                    resolve(res.data)
                })
                .catch((err) => {
                    setBlogLoader(false)
                    reject(err)
                })
        })
    }

    const onDeleteBlog = (id: number) => {
        setBlogLoader(true)
        return new Promise((resolve, reject) => {
            BlogService.deleteBlog(id)
                .then((res) => {
                    setBlogLoader(false)
                    resolve(res)
                })
                .catch((err) => {
                    setBlogLoader(false)
                    reject(err)
                })
        })
    }

    const onDeleteArticle = (id: number) => {
        setBlogLoader(true)
        return new Promise((resolve, reject) => {
            BlogService.deleteArticle(id)
                .then((res) => {
                    setBlogLoader(false)
                    resolve(res)
                })
                .catch((err) => {
                    setBlogLoader(false)
                    reject(err)
                })
        })
    }

    return {
        onUploadImages,
        onUploadSlides,
        GetById,
        onCreateBlog,
        onPublishArticle,
        onGetArticle,
        onSearchArticle,
        onSearchBlog,
        onDeleteBlog,
        onDeleteArticle,
        BlogLoader,
    }
}

export default useBlogService
