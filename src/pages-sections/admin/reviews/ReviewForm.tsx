import React, { FC, useEffect, useState } from 'react'
import {
    Button,
    Card,
    Grid,
    MenuItem,
    TextField,
    styled,
    Box,
    alpha,
    FormControl,
    InputLabel,
    Select,
    OutlinedInput,
    Chip,
    SelectChangeEvent,
    useTheme,
    Theme,
} from '@mui/material'
import { Clear } from '@mui/icons-material'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { Assign, ObjectShape } from 'yup/lib/object'
import DropZone from 'components/DropZone'
import { FlexBox } from 'components/flex-box'
import BazaarImage from 'components/BazaarImage'
import { TProductCategory } from 'types/TProductCategory'
import { TProduct, _colorsOptions } from 'types/TProduct'
import { TProductVariant } from 'types/TProductVariant'
import { findDuplicates, findMatchingLabel } from 'helpers/Extensions'
import {
    eReviewStatus,
    TProductReview,
    TProductReviewDto,
} from 'types/TProductReview'

// styled components
const UploadImageBox = styled(Box)(({ theme }) => ({
    width: 70,
    height: 70,
    display: 'flex',
    overflow: 'hidden',
    borderRadius: '8px',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: alpha(theme.palette.info.light, 0.1),
}))

const StyledClear = styled(Clear)(() => ({
    top: 5,
    right: 5,
    fontSize: 14,
    cursor: 'pointer',
    position: 'absolute',
}))

// ================================================================
type ReviewFormProps = {
    initialValues: TProductReviewDto
    handleReviewStatusChange: (id: number, status: eReviewStatus) => void
}

// ================================================================

const ReviewForm: FC<ReviewFormProps> = (props) => {
    const { initialValues, handleReviewStatusChange } = props

    return (
        <Card sx={{ p: 6 }}>
            <Grid container spacing={3}>
                <Grid item sm={6} xs={12}>
                    <TextField
                        fullWidth
                        name="name"
                        label="Name"
                        sx={{
                            '& .Mui-disabled': {
                                '-webkitTextFillColor': 'black',
                                opacity: '1',
                            },
                        }}
                        color="info"
                        size="small"
                        placeholder="Name"
                        value={initialValues.productName}
                        disabled
                    />
                    <TextField
                        multiline
                        sx={{
                            mt: 2,
                            '& .Mui-disabled': {
                                '-webkitTextFillColor': 'black',
                                opacity: '1',
                            },
                        }}
                        rows={2}
                        fullWidth
                        name="name"
                        label="Comment"
                        color="info"
                        size="small"
                        placeholder="Name"
                        value={initialValues.review}
                        disabled
                    />
                    <FlexBox
                        alignItems={'center'}
                        columnGap="15px"
                        sx={{ mt: 2 }}
                    >
                        <Button
                            variant="contained"
                            color="info"
                            type="button"
                            onClick={() =>
                                handleReviewStatusChange(
                                    initialValues.id,
                                    eReviewStatus.Approved
                                )
                            }
                            disabled={
                                initialValues.status !==
                                eReviewStatus.WaitingForApproval
                            }
                        >
                            Approve Review
                        </Button>
                        <Button
                            variant="contained"
                            color="marron"
                            type="button"
                            onClick={() =>
                                handleReviewStatusChange(
                                    initialValues.id,
                                    eReviewStatus.Rejected
                                )
                            }
                            disabled={
                                initialValues.status !==
                                eReviewStatus.WaitingForApproval
                            }
                        >
                            Reject Review
                        </Button>
                    </FlexBox>
                </Grid>

                <Grid item sm={6} xs={12}>
                    <Box
                        component={'img'}
                        src={initialValues.productImage}
                        height={250}
                        sx={{ borderRadius: '8px' }}
                    ></Box>
                </Grid>
            </Grid>
        </Card>
    )
}

export default ReviewForm
