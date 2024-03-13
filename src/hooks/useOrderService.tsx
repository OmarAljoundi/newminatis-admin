import { AxiosResponse } from 'axios'
import { useState } from 'react'
import OrderService from 'service/OrderService'
import { SearchQuery } from 'types/TSearchQuery'

const useOrderService = () => {
    const [OrderLoader, SetOrderLoader] = useState(false)

    const onSearchOrders = (body: SearchQuery) => {
        SetOrderLoader(true)

        return new Promise((resolve, reject) => {
            OrderService.search(body)
                .then((res) => {
                    SetOrderLoader(false)
                    resolve(res.data)
                })
                .catch((err) => {
                    SetOrderLoader(false)
                    reject(err)
                })
        })
    }

    const onGetOrderById = (id: number) => {
        SetOrderLoader(true)

        return new Promise((resolve, reject) => {
            OrderService.getById(id)
                .then((res) => {
                    SetOrderLoader(false)
                    resolve(res.data)
                })
                .catch((err) => {
                    SetOrderLoader(false)
                    reject(err)
                })
        })
    }
    const onExportToExcel = (): Promise<AxiosResponse<Blob>> => {
        SetOrderLoader(true)
        return new Promise((resolve, reject) => {
            OrderService.exportExcel()
                .then((res) => {
                    SetOrderLoader(false)
                    resolve(res)
                })
                .catch((err) => {
                    SetOrderLoader(false)
                    reject(err)
                })
        })
    }

    return {
        onSearchOrders,
        onGetOrderById,
        onExportToExcel,
        OrderLoader,
    }
}

export default useOrderService
