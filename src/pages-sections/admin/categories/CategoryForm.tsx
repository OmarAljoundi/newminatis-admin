import { FC, useEffect, useState } from 'react'
import {
    Button,
    Card,
    Grid,
    MenuItem,
    TextField,
    Box,
    FormControl,
    InputLabel,
    Select,
    OutlinedInput,
    Chip,
    useTheme,
    Theme,
    Divider,
} from '@mui/material'
import { FormikProps } from 'formik'

import { TProductCategory } from 'types/TProductCategory'
import { eColor, TProduct, _colorsOptions } from 'types/TProduct'
import { TProductVariant } from 'types/TProductVariant'
import { convertStringToArray } from 'helpers/Extensions'
import { TProductTags } from 'types/TProductTags'
import TextEditor from 'components/TextEditor'
import CategoryDropZone from './CategoryDropZone'
import { FlexBetween } from 'components/flex-box'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
}

// ================================================================
type ProductFormProps = {
    formik: FormikProps<TProductCategory>
}

// ================================================================

const CategoryForm: FC<ProductFormProps> = (props) => {
    const { formik } = props

    return (
        <Card sx={{ p: 6, overflow: 'visible' }}>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <FlexBetween columnGap={3} mb={3}>
                            <TextField
                                fullWidth
                                name="name"
                                label="Name"
                                color="info"
                                size="small"
                                placeholder="Name"
                                value={formik.values?.name}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                error={
                                    !!formik.touched?.name &&
                                    !!formik.errors?.name
                                }
                                helperText={
                                    (formik.touched?.name &&
                                        formik.errors?.name) as string
                                }
                            />
                            <TextField
                                fullWidth
                                color="info"
                                size="small"
                                name="description"
                                onBlur={formik.handleBlur}
                                disabled
                                placeholder="Description"
                                onChange={formik.handleChange}
                                value={formik.values?.description ?? null}
                                label="Category Permalink"
                            />
                        </FlexBetween>

                        <FlexBetween columnGap={3} mb={3}>
                            <TextField
                                fullWidth
                                name="seoTitle"
                                label="SEO Title"
                                color="info"
                                size="small"
                                placeholder="SEO Title"
                                value={formik.values?.seoTitle}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                            />
                            <TextField
                                fullWidth
                                color="info"
                                size="small"
                                name="seoTags"
                                onBlur={formik.handleBlur}
                                placeholder="SEO Tags"
                                onChange={formik.handleChange}
                                value={formik.values?.seoTags ?? null}
                                label="SEO Tags"
                            />
                        </FlexBetween>

                        <Grid item sm={12} xs={12} mb={3}>
                            <TextField
                                multiline
                                rows={6}
                                fullWidth
                                color="info"
                                size="small"
                                name="seoDescription"
                                onBlur={formik.handleBlur}
                                placeholder="SEO Description"
                                onChange={formik.handleChange}
                                value={formik.values?.seoDescription ?? null}
                                label="SEO Description"
                            />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <Button
                                variant="contained"
                                color="info"
                                type="submit"
                            >
                                Save Category
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        {formik.values?.id > 0 && (
                            <CategoryDropZone formik={formik} />
                        )}
                    </Grid>
                </Grid>
            </form>
        </Card>
    )
}

export default CategoryForm
