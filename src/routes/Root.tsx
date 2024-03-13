import { Axios, AxiosResponse } from 'axios'
import { IBaseResponse } from 'interface/IBaseResponse'
import { IOrderResponse } from 'interface/IOrderResponse'
import { IProductResponse } from 'interface/IProductResponse'
import { IProductReviewResponse } from 'interface/IProductReviewResponse'
import { IVoucherResponse } from 'interface/IVoucherResponse'
import Cookies from 'js-cookie'
import VoucherForm from 'pages-sections/admin/vouchers/VoucherForm'
import Login from 'pages-sections/session/Login'
import ArticlesList from 'pages/articles'
import BlogList from 'pages/blogs'
import CreateBlog from 'pages/blogs/create'
import EditBlog from 'pages/blogs/[id]'
import CategoryList from 'pages/categories'
import CustomerList from 'pages/customers'
import OrderList from 'pages/orders'
import OrderView from 'pages/orders/[id]'
import ProductList from 'pages/products'
import CreateProduct from 'pages/products/create'
import EditProduct from 'pages/products/[id]'
import ReviewList from 'pages/reviews'
import ReviewPage from 'pages/reviews/[id]'
import UsefulLinks from 'pages/useful-links'
import VendorDashboard from 'pages/vendor/dashboard'
import SiteSettings from 'pages/vendor/site-settings'
import VoucherList from 'pages/voucher'
import CreateVoucher from 'pages/voucher/create'
import EditVoucher from 'pages/voucher/[id]'
import { useEffect, useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import OrderService from 'service/OrderService'
import ProductService from 'service/ProductService'
import ReviewService from 'service/ReviewService'
import UserService from 'service/UserService'

import VoucherService from 'service/VoucherService'
import { TProductCategory } from 'types/TProductCategory'
import Child from './Child'
import { ProtectedRoute } from './ProtectedRoute'
import CreateCategory from 'pages/categories/create'
import EditCategory from 'pages/categories/[id]'

const Root = () => {
    const router = createBrowserRouter([
        {
            path: 'login',
            element: <Login />,
        },
        {
            path: '/',
            element: <Child />,

            children: [
                {
                    path: '',
                    element: <VendorDashboard />,
                },
                {
                    path: '/customers',
                    element: <CustomerList />,
                },
                {
                    path: 'product',
                    element: <CreateProduct />,
                },
                {
                    path: 'product/:id',
                    element: <EditProduct />,
                },

                {
                    path: 'blog',
                    element: <CreateBlog />,
                },
                {
                    path: 'blog/:id',
                    element: <EditBlog />,
                },

                {
                    path: 'vouchers',
                    element: <CreateVoucher />,
                },
                {
                    path: 'vouchers/:id',
                    element: <EditVoucher />,
                    loader: async ({ params }) => {
                        const object: any = params
                        return (await VoucherService.getById(object.id))
                            .data as IVoucherResponse
                    },
                },
                {
                    path: 'voucher-list',
                    element: <VoucherList />,
                    loader: async () => {
                        return (await VoucherService.get())
                            .data as IVoucherResponse
                    },
                },
                {
                    path: 'review-list',
                    element: <ReviewList />,
                },
                {
                    path: 'review/:id',
                    element: <ReviewPage />,
                    loader: async ({ params }) => {
                        const object: any = params
                        return (await ReviewService.getById(object.id))
                            .data as IProductReviewResponse
                    },
                },

                {
                    path: 'product-list',
                    element: <ProductList />,
                    loader: async () => {
                        return (await ProductService.search())
                            .data as IProductResponse
                    },
                },

                {
                    path: 'blog-list',
                    element: <BlogList />,
                },
                {
                    path: 'articles',
                    element: <ArticlesList />,
                },

                {
                    path: 'categories',
                    element: <CategoryList />,
                    loader: async () => {
                        return (await ProductService.getCategories())
                            .data as TProductCategory[]
                    },
                },
                {
                    path: 'categories/create',
                    element: <CreateCategory />,
                },
                {
                    path: 'categories/:id',
                    element: <EditCategory />,
                },
                {
                    path: 'orders',
                    element: <OrderList />,
                },
                {
                    path: 'order/:id',
                    element: <OrderView />,
                    loader: async ({ params }) => {
                        const object: any = params
                        return (await OrderService.getById(object.id))
                            .data as IOrderResponse
                    },
                },

                {
                    path: 'site-settings',
                    element: <SiteSettings />,
                },
                {
                    path: 'useful-links',
                    element: <UsefulLinks />,
                },
            ],
        },
    ])

    return (
        <div className="app">
            <ToastContainer />
            <RouterProvider router={router} />
        </div>
    )
}

export default Root
