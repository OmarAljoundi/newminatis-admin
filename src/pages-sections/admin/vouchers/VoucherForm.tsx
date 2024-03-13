import { FC, useEffect } from 'react'
import { Button, Card, Grid, MenuItem, TextField } from '@mui/material'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import useVoucherService from 'hooks/useVoucherService'
import { IVoucherResponse } from 'interface/IVoucherResponse'

export type TVoucher = {
    id: number
    code: string
    type: 'Fixed' | 'Discount'
    amount: number
    active: boolean | null
    limitedUsedPerUser: number
    limitedUsedPerCoupon: number
    expired: Date
    createdDate?: Date | null
    orderDetails?: any[]
}

// ================================================================
type VoucherFormProps = {
    initialValues: TVoucher
    handleFormSubmit: (values: TVoucher) => void
}

// ================================================================

const VoucherForm: FC<VoucherFormProps> = (props) => {
    const { initialValues, handleFormSubmit } = props
    const { onCheckCode } = useVoucherService()
    const validationSchema = yup.object().shape({
        code: yup.string().required('Code is required'),
        amount: yup.number().min(1).required('Amount is required'),
        expired: yup.date().required('Expiry date is required'),
    })
    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: handleFormSubmit,
        validateOnMount: true,
        validateOnBlur: true,
        validateOnChange: true,
    })

    const checkIfCodeExsist = async () => {
        formik.setFieldTouched('code', true)
        if (formik.values.code) {
            const result = (await onCheckCode(
                formik.values.code
            )) as IVoucherResponse
            if (!result.success) {
                formik.setFieldError('code', 'Code already exsist')
            } else {
                delete formik.errors['code']
            }
        }
    }

    useEffect(() => {
        console.log(formik.errors)
    }, [formik])

    return (
        <Card sx={{ p: 6 }}>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item sm={6} xs={12}>
                        <TextField
                            disabled={formik.values.id != 0}
                            fullWidth
                            name="code"
                            label="Coupon Code"
                            color="info"
                            size="small"
                            placeholder="Coupon Code"
                            value={formik.values.code ?? ''}
                            onBlur={checkIfCodeExsist}
                            onChange={formik.handleChange}
                            error={
                                !!formik.touched.code && !!formik.errors.code
                            }
                            helperText={
                                (formik.touched.code &&
                                    formik.errors.code) as string
                            }
                        />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <TextField
                            select
                            fullWidth
                            color="info"
                            size="small"
                            name="type"
                            onBlur={formik.handleBlur}
                            placeholder="Type"
                            onChange={formik.handleChange}
                            value={formik.values.type ?? null}
                            label="Select Type"
                            error={
                                !!formik.touched.type && !!formik.errors.type
                            }
                            helperText={
                                (formik.touched.type &&
                                    formik.errors.type) as string
                            }
                        >
                            {['Fixed', 'Discount'].map((item) => (
                                <MenuItem value={item}>{item}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid item sm={6} xs={12}>
                        <TextField
                            fullWidth
                            name="amount"
                            label="Amount"
                            color="info"
                            size="small"
                            type="number"
                            placeholder="Amount"
                            value={formik.values.amount}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            error={
                                !!formik.touched.amount &&
                                !!formik.errors.amount
                            }
                            helperText={
                                (formik.touched.amount &&
                                    formik.errors.amount) as string
                            }
                        />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                value={formik.values.expired}
                                onChange={(value) =>
                                    formik.setFieldValue('expired', value, true)
                                }
                                minDate={new Date()}
                                renderInput={(params) => (
                                    <TextField
                                        error={Boolean(
                                            formik.touched.expired &&
                                                formik.errors.expired
                                        )}
                                        helperText={
                                            formik.touched.expired &&
                                            (formik.errors.expired as string)
                                        }
                                        label="Expired"
                                        name="expired"
                                        fullWidth
                                        {...params}
                                    />
                                )}
                            />
                        </LocalizationProvider>
                    </Grid>

                    <Grid item sm={6} xs={12}>
                        <TextField
                            fullWidth
                            color="info"
                            size="small"
                            type="number"
                            name="limitedUsedPerCoupon"
                            label="Limited Per Coupon"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            placeholder="limited Used Per Coupon"
                            value={formik.values.limitedUsedPerCoupon}
                            error={
                                !!formik.touched.limitedUsedPerCoupon &&
                                !!formik.errors.limitedUsedPerCoupon
                            }
                            helperText={
                                (formik.touched.limitedUsedPerCoupon &&
                                    formik.errors
                                        .limitedUsedPerCoupon) as string
                            }
                        />
                    </Grid>

                    <Grid item sm={6} xs={12}>
                        <TextField
                            fullWidth
                            name="limitedUsedPerUser"
                            color="info"
                            size="small"
                            type="number"
                            onBlur={formik.handleBlur}
                            value={formik.values.limitedUsedPerUser}
                            label="limited Per User"
                            onChange={formik.handleChange}
                            placeholder="limited Used Per User"
                            error={
                                !!formik.touched.limitedUsedPerUser &&
                                !!formik.errors.limitedUsedPerUser
                            }
                            helperText={
                                (formik.touched.limitedUsedPerUser &&
                                    formik.errors.limitedUsedPerUser) as string
                            }
                        />
                    </Grid>

                    <Grid item sm={12} xs={12}>
                        <Button
                            variant="contained"
                            color="info"
                            type="submit"
                            disabled={!formik.isValid}
                        >
                            Save Voucher
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Card>
    )
}

export default VoucherForm
