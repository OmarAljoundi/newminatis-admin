import { http } from './httpService'
import axios from 'axios'
import { IVoucherResponse } from 'interface/IVoucherResponse'
import { TVoucher } from 'pages-sections/admin/vouchers/VoucherForm'

class VoucherService {
    create(data: TVoucher) {
        return http(axios.create()).post<IVoucherResponse>(`/Voucher`, data)
    }

    get() {
        return http(axios.create()).get<IVoucherResponse>(`/Voucher`)
    }

    getById(id: number) {
        return http(axios.create()).get<IVoucherResponse>(`/Voucher/${id}`)
    }

    updateStatus(id: number) {
        return http(axios.create()).put<IVoucherResponse>(
            `/Voucher/UpdateStatus/${id}`
        )
    }

    deleteVoucher(id: number) {
        return http(axios.create()).delete<IVoucherResponse>(`/Voucher/${id}`)
    }

    voucherExsist(code: string) {
        return http(axios.create()).get<IVoucherResponse>(
            `/Voucher/VoucherExsist/${code}`
        )
    }
}

export default new VoucherService()
