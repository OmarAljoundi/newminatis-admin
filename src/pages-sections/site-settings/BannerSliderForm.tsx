import { FC, useEffect, useState } from 'react'
import { Card, Grid, TextField } from '@mui/material'

import * as yup from 'yup'
import { useFormik } from 'formik'
import { Assign, ObjectShape } from 'yup/lib/object'

import { TBannerSetting } from 'types/TBannerSetting'
import { H3 } from 'components/Typography'
import { FlexBox } from 'components/flex-box'

// styled components

// ================================================================
type ProductFormProps = {
    formik: any
    index: number
}

// ================================================================

const BannerSliderForm: FC<ProductFormProps> = (props) => {
    const { formik, index } = props

    return (
        <Grid item xs={6}>
            <Card sx={{ p: 4 }}>
                <FlexBox
                    alignItems="center"
                    justifyContent="space-between"
                    gap={1}
                >
                    <H3 sx={{ paddingBottom: '10px' }}>
                        {formik.values[index]?.file?.name}
                    </H3>
                    <img src={formik.values[index]?.file?.preview} width={50} />
                </FlexBox>

                <Grid item sm={12} xs={12} sx={{ paddingBottom: '20px' }}>
                    <TextField
                        fullWidth
                        color="info"
                        size="small"
                        name={`values[${index}].action`}
                        onBlur={formik.handleBlur}
                        placeholder="Action Text"
                        onChange={(e) =>
                            formik.setFieldValue(
                                `[${index}].action`,
                                e.target.value
                            )
                        }
                        value={formik.values[index].action}
                        label="Action"
                        error={
                            !!formik.touched.action && !!formik.errors.action
                        }
                        helperText={
                            (formik.touched.action &&
                                formik.errors.action) as string
                        }
                    />
                </Grid>

                <Grid item sm={12} xs={12} sx={{ paddingBottom: '20px' }}>
                    <TextField
                        fullWidth
                        value={formik.values[index].actionUrl}
                        label="Action Url"
                        color="info"
                        size="small"
                        placeholder="Action Url"
                        onChange={(e) =>
                            formik.setFieldValue(
                                `[${index}].actionUrl`,
                                e.target.value
                            )
                        }
                        error={
                            !!formik.touched.actionUrl &&
                            !!formik.errors.actionUrl
                        }
                        helperText={
                            (formik.touched.actionUrl &&
                                formik.errors.actionUrl) as string
                        }
                    />
                </Grid>

                <Grid item sm={12} xs={12}>
                    <TextField
                        fullWidth
                        color="info"
                        size="small"
                        value={formik.values[index].text}
                        placeholder="Primary Text"
                        onChange={(e) =>
                            formik.setFieldValue(
                                `[${index}].text`,
                                e.target.value
                            )
                        }
                        label="Text"
                        error={!!formik.touched.text && !!formik.errors.text}
                        helperText={
                            (formik.touched.text &&
                                formik.errors.text) as string
                        }
                    />
                </Grid>
            </Card>
        </Grid>
    )
}

export default BannerSliderForm
