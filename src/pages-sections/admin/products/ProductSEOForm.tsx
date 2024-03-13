import { FC } from 'react'
import { Button, Card, Grid, TextField } from '@mui/material'
import { FormikProps } from 'formik'

import { TProduct } from 'types/TProduct'

// ================================================================
type ProductSeoFormProps = {
    formik: FormikProps<TProduct>
}

// ================================================================

const ProductSeoForm: FC<ProductSeoFormProps> = ({ formik }) => {
    return (
        <Card sx={{ p: 6, overflow: 'visible' }}>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item sm={6} xs={12}>
                        <TextField
                            fullWidth
                            name="seoTitle"
                            label="Seo Title"
                            color="info"
                            size="small"
                            placeholder="Seo Title"
                            value={formik.values?.seoTitle ?? ''}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <TextField
                            fullWidth
                            name="seoTags"
                            label="Seo Tags"
                            color="info"
                            size="small"
                            placeholder="Seo Tags"
                            value={formik.values?.seoTags ?? ''}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                        />
                    </Grid>

                    <Grid item sm={12} xs={12}>
                        <TextField
                            multiline
                            rows={6}
                            fullWidth
                            name="seoDescription"
                            label="Seo description"
                            color="info"
                            size="small"
                            placeholder="Seo description"
                            value={formik.values?.seoDescription}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                        />
                    </Grid>

                    <Grid item sm={6} xs={12}>
                        <Button variant="contained" color="info" type="submit">
                            Save product
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Card>
    )
}

export default ProductSeoForm
