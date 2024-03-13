import { ReactElement, useEffect, useState } from 'react'
import {
    Alert,
    Avatar,
    Backdrop,
    Box,
    CircularProgress,
    Rating,
} from '@mui/material'
import * as yup from 'yup'
import { H3, H5, Span } from 'components/Typography'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import { useLoaderData } from 'react-router-dom'
import { notifyError, notifySuccess } from 'service/toasterService'
import { FlexBetween, FlexBox } from 'components/flex-box'
import { eReviewStatus, TProductReviewDto } from 'types/TProductReview'
import { IProductReviewResponse } from 'interface/IProductReviewResponse'
import ReviewForm from 'pages-sections/admin/reviews/ReviewForm'
import useReviewService from 'hooks/useReviewService'
import { AxiosResponse } from 'axios'

// form field validation schema
const validationSchema = yup.object().shape({})

// =============================================================================
ReviewPage.getLayout = function getLayout(page: ReactElement) {
    return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}
// =============================================================================

export default function ReviewPage() {
    const [INITIAL_VALUES, setINITIAL_VALUES] = useState<TProductReviewDto>(
        (useLoaderData() as IProductReviewResponse).productReviewDto
    )

    const { onUpdateReview, ReviewLoader } = useReviewService()

    const handleReviewStatusChange = async (
        id: number,
        status: eReviewStatus
    ) => {
        const result = (await onUpdateReview(
            id,
            status
        )) as AxiosResponse<IProductReviewResponse>

        if (result.status == 200) {
            notifySuccess(
                `Review has been ${
                    status == 1 ? 'Approved' : 'Rejected'
                } successfully!`
            )
            INITIAL_VALUES.status = status
            setINITIAL_VALUES(INITIAL_VALUES)
        } else {
            notifyError('Something went wrong')
        }
    }

    return (
        <Box py={4}>
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={ReviewLoader}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <H3 mb={2}>User Review</H3>
            {INITIAL_VALUES.status != 0 && (
                <Alert variant="outlined" severity="info" sx={{ my: 2 }}>
                    This is review is marked as{' '}
                    {INITIAL_VALUES.status == 1 ? 'Approved' : 'Rejected'}
                </Alert>
            )}

            <FlexBetween mb={2}>
                <FlexBox alignItems={'center'} columnGap="15px">
                    <Avatar />
                    <H5 fontWeight={'600'}>{INITIAL_VALUES.userEmail}</H5>
                </FlexBox>
                <Rating
                    color="warn"
                    size="medium"
                    value={INITIAL_VALUES.stars}
                    disabled
                />
            </FlexBetween>

            <ReviewForm
                initialValues={INITIAL_VALUES}
                handleReviewStatusChange={handleReviewStatusChange}
            />
        </Box>
    )
}
