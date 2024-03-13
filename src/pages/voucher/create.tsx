import { ReactElement, useState } from 'react'
import { Box } from '@mui/material'
import * as yup from 'yup'
import { H3 } from 'components/Typography'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import { notifyError, notifySuccess } from 'service/toasterService'
import { useNavigate } from 'react-router-dom'
import VoucherForm, {
    TVoucher,
} from 'pages-sections/admin/vouchers/VoucherForm'
import useVoucherService from 'hooks/useVoucherService'
import { IVoucherResponse } from 'interface/IVoucherResponse'
import { FlexBox } from 'components/flex-box'

// =============================================================================
CreateVoucher.getLayout = function getLayout(page: ReactElement) {
    return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}
// =============================================================================

export default function CreateVoucher() {
    const { onCreateVoucher, voucherLoad } = useVoucherService()
    const [checked, setChecked] = useState(true)
    const navigate = useNavigate()

    const INITIAL_VALUES: TVoucher = {
        amount: 0,
        code: '',
        expired: null,
        id: 0,
        limitedUsedPerCoupon: 0,
        limitedUsedPerUser: 0,
        type: 'Discount',
        active: true,
    }

    const handleFormSubmit = async (e: TVoucher) => {
        e.active = checked
        const result = (await onCreateVoucher(e)) as IVoucherResponse
        if (result.success) {
            notifySuccess('Voucher Created Successfully')
            navigate({
                pathname: `/vouchers/${result.voucher.id}`,
            })
        } else {
            result.errors.map((item) => {
                notifyError(item)
            })
        }
    }

    return (
        <Box py={4}>
            <H3 mb={2}>Add New Voucher</H3>

            <VoucherForm
                initialValues={INITIAL_VALUES}
                handleFormSubmit={handleFormSubmit}
            />
        </Box>
    )
}
