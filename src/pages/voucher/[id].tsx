import { ReactElement, useEffect, useState } from 'react'
import { Box, FormControlLabel, Switch } from '@mui/material'
import { H3 } from 'components/Typography'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import { useLoaderData } from 'react-router-dom'
import { notifySuccess } from 'service/toasterService'
import VoucherForm, {
    TVoucher,
} from 'pages-sections/admin/vouchers/VoucherForm'
import useVoucherService from 'hooks/useVoucherService'
import { IVoucherResponse } from 'interface/IVoucherResponse'
import { FlexBox } from 'components/flex-box'

// form field validation schema

// =============================================================================
EditVoucher.getLayout = function getLayout(page: ReactElement) {
    return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}
// =============================================================================

export default function EditVoucher() {
    const INITIAL_VALUES: TVoucher = (useLoaderData() as IVoucherResponse)
        .voucher
    const [checked, setChecked] = useState(INITIAL_VALUES.active)
    const { onCreateVoucher } = useVoucherService()

    const handleFormSubmit = async (e: TVoucher) => {
        e.active = checked
        const result = (await onCreateVoucher(e)) as IVoucherResponse
        if (result.success) {
            notifySuccess('Voucher Updated Successfully')
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked)
    }

    return (
        <Box py={4}>
            <H3 mb={2}></H3>
            <FlexBox justifyContent={'space-between'} alignItems={'center'}>
                <H3 mb={2}>Edit Voucher</H3>
                <FormControlLabel
                    control={
                        <Switch checked={checked} onChange={handleChange} />
                    }
                    label="Voucher Status"
                />
            </FlexBox>
            <VoucherForm
                initialValues={INITIAL_VALUES}
                handleFormSubmit={handleFormSubmit}
            />
        </Box>
    )
}
