import { FC, useState } from 'react'
import { Delete, Edit, RemoveRedEye } from '@mui/icons-material'
import { Avatar, Box } from '@mui/material'
import { FlexBox } from 'components/flex-box'
import BazaarSwitch from 'components/BazaarSwitch'
import { Paragraph, Small } from 'components/Typography'
import { currency } from 'lib'
import {
    StyledTableRow,
    CategoryWrapper,
    StyledTableCell,
    StyledIconButton,
} from '../StyledComponents'
import { Link } from 'react-router-dom'
import { TVoucher } from './VoucherForm'
import useVoucherService from 'hooks/useVoucherService'
import { IVoucherResponse } from 'interface/IVoucherResponse'
import { notifySuccess } from 'service/toasterService'

// ========================================================================
type VoucherRowProps = {
    voucher: any
    handleDeleteVoucher: (id: number) => void
}
// ========================================================================

const VoucherRow: FC<VoucherRowProps> = ({ voucher, handleDeleteVoucher }) => {
    const {
        active,
        amount,
        code,
        expired,
        id,
        limitedUsedPerCoupon,
        limitedUsedPerUser,
        type,
        createdDate,
        used,
    } = voucher

    const [productPulish, setProductPublish] = useState(active)
    const { onUpdateStatus, onDeleteVoucher } = useVoucherService()

    const handleUpdateVoucherStatus = async (id: number) => {
        const result = (await onUpdateStatus(id)) as IVoucherResponse
        if (result.success) {
            notifySuccess('Voucher Status Updated!')
        }
    }

    return (
        <StyledTableRow tabIndex={-1} role="checkbox">
            <StyledTableCell align="left">#{id}</StyledTableCell>
            <StyledTableCell align="left">{code}</StyledTableCell>
            <StyledTableCell align="left">
                <CategoryWrapper>{type}</CategoryWrapper>
            </StyledTableCell>
            <StyledTableCell align="left">{amount}</StyledTableCell>
            <StyledTableCell align="left">
                {limitedUsedPerCoupon}
            </StyledTableCell>
            <StyledTableCell align="left">{limitedUsedPerUser}</StyledTableCell>
            <StyledTableCell align="left">
                <CategoryWrapper>{used}</CategoryWrapper>
            </StyledTableCell>
            <StyledTableCell align="left">
                {new Date(expired).toDateString()}
            </StyledTableCell>
            <StyledTableCell align="left">
                {new Date(createdDate).toDateString()}
            </StyledTableCell>

            <StyledTableCell align="left">
                <BazaarSwitch
                    color="info"
                    checked={productPulish}
                    onChange={() => {
                        setProductPublish((state) => !state)
                        handleUpdateVoucherStatus(id)
                    }}
                />
            </StyledTableCell>
            <StyledTableCell align="center">
                <Link to={`/vouchers/${id}`}>
                    <StyledIconButton>
                        <Edit />
                    </StyledIconButton>
                </Link>

                <StyledIconButton onClick={() => handleDeleteVoucher(id)}>
                    <Delete />
                </StyledIconButton>
            </StyledTableCell>
        </StyledTableRow>
    )
}

export default VoucherRow
