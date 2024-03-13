import { FC } from 'react'
import { Delete, Edit } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import { FlexBox } from 'components/flex-box'
import { Paragraph } from 'components/Typography'
import {
    StyledIconButton,
    StyledTableCell,
    StyledTableRow,
} from './StyledComponents'
import { currency } from 'lib'
import { TUserAddress } from 'types/TUserAddress'
import Moment from 'react-moment'

// ========================================================================
type CustomerRowProps = { customer: TUserAddress }
// ========================================================================

const CustomerRow: FC<CustomerRowProps> = ({ customer }) => {
    const {
        addressLine,
        city,
        country,
        firstName,
        lastName,
        createdDate,
        phoneNumber,
        email,
        modifiedDate,
    } = customer

    return (
        <StyledTableRow tabIndex={-1} role="checkbox">
            <StyledTableCell align="left">
                <FlexBox alignItems="center" gap={1.5}>
                    <Paragraph>
                        {firstName} {lastName}
                    </Paragraph>
                </FlexBox>
            </StyledTableCell>

            <StyledTableCell align="left" sx={{ fontWeight: 400 }}>
                {phoneNumber}
            </StyledTableCell>

            <StyledTableCell align="left" sx={{ fontWeight: 400 }}>
                {email}
            </StyledTableCell>

            <StyledTableCell align="left" sx={{ fontWeight: 400 }}>
                {country} - {city}
            </StyledTableCell>

            <StyledTableCell align="left" sx={{ fontWeight: 400 }}>
                {addressLine}
            </StyledTableCell>

            <StyledTableCell align="left" sx={{ fontWeight: 400 }}>
                <Moment format="YYYY-MM-DD">
                    {createdDate ?? modifiedDate}
                </Moment>
            </StyledTableCell>
        </StyledTableRow>
    )
}

export default CustomerRow
