import { FC } from 'react'
import { Delete, RemoveRedEye } from '@mui/icons-material'
import { currency } from 'lib'
import {
    StatusWrapper,
    StyledIconButton,
    StyledTableCell,
    StyledTableRow,
} from '../StyledComponents'
import { format } from 'date-fns'
import { TOrderDto } from 'types/TOrder'
import { useNavigate } from 'react-router-dom'
import { Chip } from '@mui/material'
import { MapColors, MapStatus } from 'helpers/Extensions'

// ========================================================================
type OrderRowProps = { order: TOrderDto }
// ========================================================================

const OrderRow: FC<OrderRowProps> = ({ order }) => {
    const {
        amount,
        depoterOrderId,
        edd,
        id,
        purchaseDate,
        quantity,
        shippingAddress,
        status,
        userEmail,
    } = order
    const router = useNavigate()
    return (
        <StyledTableRow tabIndex={-1} role="checkbox">
            <StyledTableCell align="left">#{id}</StyledTableCell>
            <StyledTableCell align="left">
                {userEmail.length > 10
                    ? userEmail.substring(0, 10) + '...'
                    : userEmail}
            </StyledTableCell>
            <StyledTableCell align="center">
                <Chip label={quantity} />
            </StyledTableCell>
            <StyledTableCell align="left" sx={{ fontWeight: 400 }}>
                {format(new Date(purchaseDate), 'dd MMM yyyy')}
            </StyledTableCell>

            <StyledTableCell align="left" sx={{ fontWeight: 400 }}>
                {shippingAddress}
            </StyledTableCell>

            <StyledTableCell align="left">{currency(amount)}</StyledTableCell>

            <StyledTableCell align="left">
                <StatusWrapper status={status}>
                    {MapStatus(status)}
                </StatusWrapper>
            </StyledTableCell>

            <StyledTableCell align="center">
                <StyledIconButton>
                    <RemoveRedEye
                        onClick={() => router(`/order/${order.id}`)}
                    />
                </StyledIconButton>
            </StyledTableCell>
        </StyledTableRow>
    )
}

export default OrderRow
