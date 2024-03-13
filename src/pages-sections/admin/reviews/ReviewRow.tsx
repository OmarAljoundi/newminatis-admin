import { FC, useState } from 'react'
import { Delete, Edit, RemoveRedEye } from '@mui/icons-material'
import { Avatar, Box, Rating } from '@mui/material'
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
import useVoucherService from 'hooks/useVoucherService'
import { IVoucherResponse } from 'interface/IVoucherResponse'
import { notifySuccess } from 'service/toasterService'
import {
    eReviewStatus,
    TProductReview,
    TProductReviewDto,
} from 'types/TProductReview'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'

// ========================================================================
type ReviewRowProps = {
    productReview: TProductReviewDto
    handleDeleteReview: (id: number) => void
}
// ========================================================================

const ReviewRow: FC<ReviewRowProps> = ({
    productReview,
    handleDeleteReview,
}) => {
    const { createdDate, id, productName, review, stars, status, userEmail } =
        productReview

    return (
        <StyledTableRow tabIndex={-1} role="checkbox">
            <StyledTableCell align="left">#{id}</StyledTableCell>
            <StyledTableCell align="left">{productName}</StyledTableCell>
            <StyledTableCell align="left">
                {review.length > 10 ? `${review.substring(0, 11)}...` : review}
            </StyledTableCell>
            <StyledTableCell align="left">
                <Rating color="warn" size="medium" value={stars} disabled />
            </StyledTableCell>

            <StyledTableCell align="left">
                <CategoryWrapper
                    sx={{
                        background:
                            status == eReviewStatus.Approved
                                ? 'lightgreen'
                                : status == eReviewStatus.Rejected
                                ? '#FF9494'
                                : '',
                        width: '90px',
                        textAlign: 'center',
                    }}
                >
                    {status == eReviewStatus.WaitingForApproval
                        ? 'Waiting For Approval..'
                        : status == eReviewStatus.Approved
                        ? 'Approved'
                        : 'Rejected'}
                </CategoryWrapper>
            </StyledTableCell>
            <StyledTableCell align="left">{userEmail}</StyledTableCell>
            <StyledTableCell align="left">
                {new Date(createdDate).toDateString()}
            </StyledTableCell>

            <StyledTableCell align="center">
                <Link to={`/review/${id}`}>
                    <StyledIconButton>
                        <RemoveRedEyeIcon />
                    </StyledIconButton>
                </Link>

                <StyledIconButton onClick={() => handleDeleteReview(id)}>
                    <Delete />
                </StyledIconButton>
            </StyledTableCell>
        </StyledTableRow>
    )
}

export default ReviewRow
