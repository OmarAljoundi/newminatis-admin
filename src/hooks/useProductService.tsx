import { useState } from 'react'
import ProductService from 'service/ProductService'
import { TProduct } from 'types/TProduct'
import { TProductCategory } from 'types/TProductCategory'
import { SearchQuery } from 'types/TSearchQuery'

const useProductService = () => {
    const [CreateLoad, setCreateLoad] = useState(false)

    const onCreateProduct = (body: TProduct) => {
        setCreateLoad(true)

        return new Promise((resolve, reject) => {
            ProductService.create(body)
                .then((res) => {
                    setCreateLoad(false)
                    resolve(res.data)
                })
                .catch((err) => {
                    setCreateLoad(false)
                    reject(err)
                })
        })
    }

    const GetById = (id: number) => {
        setCreateLoad(true)

        return new Promise((resolve, reject) => {
            ProductService.getById(id)
                .then((res) => {
                    setCreateLoad(false)
                    resolve(res.data)
                })
                .catch((err) => {
                    setCreateLoad(false)
                    reject(err)
                })
        })
    }

    const onGetCategories = () => {
        setCreateLoad(true)
        return new Promise((resolve, reject) => {
            ProductService.getCategories()
                .then((res) => {
                    setCreateLoad(false)
                    resolve(res.data)
                })
                .catch((err) => {
                    setCreateLoad(false)
                    reject(err)
                })
        })
    }

    const onGetTags = () => {
        setCreateLoad(true)
        return new Promise((resolve, reject) => {
            ProductService.getTags()
                .then((res) => {
                    setCreateLoad(false)
                    resolve(res.data)
                })
                .catch((err) => {
                    setCreateLoad(false)
                    reject(err)
                })
        })
    }

    const onUploadImages = (data: FormData) => {
        setCreateLoad(true)
        return new Promise((resolve, reject) => {
            ProductService.uploadImages(data)
                .then((res) => {
                    setCreateLoad(false)
                    resolve(res.data)
                })
                .catch((err) => {
                    setCreateLoad(false)
                    reject(err)
                })
        })
    }
    const onUploadCategoryImage = (data: FormData) => {
        setCreateLoad(true)
        return new Promise((resolve, reject) => {
            ProductService.uploadCategoryImages(data)
                .then((res) => {
                    setCreateLoad(false)
                    resolve(res.data)
                })
                .catch((err) => {
                    setCreateLoad(false)
                    reject(err)
                })
        })
    }

    const onPostCategory = (data: TProductCategory) => {
        setCreateLoad(true)
        return new Promise((resolve, reject) => {
            ProductService.postCategory(data)
                .then((res) => {
                    setCreateLoad(false)
                    resolve(res.data)
                })
                .catch((err) => {
                    setCreateLoad(false)
                    reject(err)
                })
        })
    }

    const onDeleteCategroy = (id: number) => {
        setCreateLoad(true)
        return new Promise((resolve, reject) => {
            ProductService.removeCategories(id)
                .then((res) => {
                    setCreateLoad(false)
                    resolve(res.status)
                })
                .catch((err) => {
                    setCreateLoad(false)
                    reject(err)
                })
        })
    }

    const onSearchProducts = (search: SearchQuery) => {
        setCreateLoad(true)
        return new Promise((resolve, reject) => {
            ProductService.searchShop(search)
                .then((res) => {
                    setCreateLoad(false)
                    resolve(res.data)
                })
                .catch((err) => {
                    setCreateLoad(false)
                    reject(err)
                })
        })
    }

    return {
        onCreateProduct,
        onGetCategories,
        onUploadImages,
        onPostCategory,
        onDeleteCategroy,
        onGetTags,
        GetById,
        onSearchProducts,
        onUploadCategoryImage,
        CreateLoad,
    }
}

export default useProductService
