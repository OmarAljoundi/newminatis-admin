import { FC } from 'react'
import { Card, Grid } from '@mui/material'
import { FormikProps } from 'formik'
import DropZone from 'components/DropZone'
import { _colorsOptions } from 'types/TProduct'
import { TProductCategory } from 'types/TProductCategory'
import useProductService from 'hooks/useProductService'
import { ImageLoading } from 'components/ImageLoading'

// ================================================================
type ProductFormProps = {
    formik: FormikProps<TProductCategory>
}

// ================================================================

const CategoryDropZone: FC<ProductFormProps> = ({ formik }) => {
    const { onUploadCategoryImage, CreateLoad } = useProductService()

    const handleChangeDropZone = async (files: File[]) => {
        const _file = Object.assign(files[0], {
            preview: URL.createObjectURL(files[0]),
        })

        let formData = new FormData()
        formData.append(`CategoryId`, formik.values.id?.toString() ?? '0')
        formData.append(`File`, _file)

        const result = (await onUploadCategoryImage(
            formData
        )) as TProductCategory
        if (result.imageUrl) {
            formik.setValues({
                ...formik.values,
                imageUrl: result.imageUrl,
            })
        }
    }

    return (
        <Card role={'drawer'} elevation={6}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <DropZone
                        onChange={(files) => handleChangeDropZone(files)}
                    />
                </Grid>
                <Grid item xs={12} sx={{ paddingTop: '0!important' }}>
                    {CreateLoad && (
                        <div
                            className="loader"
                            style={{
                                margin: '40px auto',
                                position: 'relative',
                            }}
                        ></div>
                    )}
                    {(formik.values.file || formik.values.imageUrl) &&
                        !CreateLoad && (
                            <ImageLoading
                                src={
                                    formik.values.file?.preview
                                        ? formik.values.file?.preview
                                        : formik.values.imageUrl
                                        ? formik.values.imageUrl
                                        : ''
                                }
                                width={'100%'}
                                height={'100%'}
                                style={{ objectFit: 'cover' }}
                            />
                        )}
                </Grid>
            </Grid>
        </Card>
    )
}

export default CategoryDropZone
