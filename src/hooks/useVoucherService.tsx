import { TVoucher } from 'pages-sections/admin/vouchers/VoucherForm'
import { useState } from 'react'
import VoucherService from 'service/VoucherService'

const useVoucherService = () => {
    const [voucherLoad, setVoucherLoad] = useState(false)

    const onCreateVoucher = (body: TVoucher) => {
        setVoucherLoad(true)

        return new Promise((resolve, reject) => {
            VoucherService.create(body)
                .then((res) => {
                    setVoucherLoad(false)
                    resolve(res.data)
                })
                .catch((err) => {
                    setVoucherLoad(false)
                    reject(err)
                })
        })
    }

    const onGetVouchers = () => {
        setVoucherLoad(true)
        return new Promise((resolve, reject) => {
            VoucherService.get()
                .then((res) => {
                    setVoucherLoad(false)
                    resolve(res.data)
                })
                .catch((err) => {
                    setVoucherLoad(false)
                    reject(err)
                })
        })
    }

    const onGetVoucherById = (id: number) => {
        setVoucherLoad(true)
        return new Promise((resolve, reject) => {
            VoucherService.getById(id)
                .then((res) => {
                    setVoucherLoad(false)
                    resolve(res.data)
                })
                .catch((err) => {
                    setVoucherLoad(false)
                    reject(err)
                })
        })
    }

    const onUpdateStatus = (id: number) => {
        setVoucherLoad(true)
        return new Promise((resolve, reject) => {
            VoucherService.updateStatus(id)
                .then((res) => {
                    setVoucherLoad(false)
                    resolve(res.data)
                })
                .catch((err) => {
                    setVoucherLoad(false)
                    reject(err)
                })
        })
    }

    const onDeleteVoucher = (id: number) => {
        setVoucherLoad(true)
        return new Promise((resolve, reject) => {
            VoucherService.deleteVoucher(id)
                .then((res) => {
                    setVoucherLoad(false)
                    resolve(res.data)
                })
                .catch((err) => {
                    setVoucherLoad(false)
                    reject(err)
                })
        })
    }

    const onCheckCode = (code: string) => {
        setVoucherLoad(true)
        return new Promise((resolve, reject) => {
            VoucherService.voucherExsist(code)
                .then((res) => {
                    setVoucherLoad(false)
                    resolve(res.data)
                })
                .catch((err) => {
                    setVoucherLoad(false)
                    reject(err)
                })
        })
    }

    return {
        onCheckCode,
        onDeleteVoucher,
        onUpdateStatus,
        onGetVoucherById,
        onGetVouchers,
        onCreateVoucher,
        voucherLoad,
    }
}

export default useVoucherService
