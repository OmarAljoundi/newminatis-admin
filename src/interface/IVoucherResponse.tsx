import { TVoucher } from 'pages-sections/admin/vouchers/VoucherForm'
import { IBaseResponse } from './IBaseResponse'

export interface IVoucherResponse extends IBaseResponse {
    voucher: TVoucher
    vouchers: TVoucher[]
}
