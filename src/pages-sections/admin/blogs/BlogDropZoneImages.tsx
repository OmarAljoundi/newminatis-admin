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
import DropZone from 'components/DropZone'
import BazaarImage from 'components/BazaarImage'
import { TProduct, _colorsOptions } from 'types/TProduct'

import { TProductImages } from 'types/TProductImages'
import { FileType } from 'pages-sections/site-settings/BannerSlider'
import { TBlogImages, TBlogs } from 'types/TBlogs'

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
type BlogDropZoneProps = {
    initialValues: TBlogs
    handleFormSubmit: (values: TBlogs) => void
    initalFiles: FileType[]
}

// ================================================================

const BlogDropZoneImages: FC<BlogDropZoneProps> = (props) => {
    const { initialValues, handleFormSubmit, initalFiles } = props

    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        onSubmit: handleFormSubmit,
        validateOnBlur: false,
        validateOnChange: false,
    })

    const handleChangeDropZone = (files: File[]) => {
        var init: TBlogImages[] = []
        files.forEach((file) => {
            var x: TBlogImages = {
                id: 0,
                file: Object.assign(file, {
                    preview: URL.createObjectURL(file),
                }),
                sortOrder: 0,
                blogId: initialValues.id,
                imageUrl: '',
            }
            init.push(x)
        })

        formik.setValues({
            ...formik.values,
            ['blogImages']: [...formik.values.blogImages, ...init],
        })
    }

    const handleFileDelete = (file: FileType) => () => {
        const files = formik.values.blogImages.filter(
            (item) => item.file.name !== file.name
        )

        formik.setValues({
            ...formik.values,
            ['blogImages']: files,
        })
    }

    useEffect(() => {
        if (initalFiles && initalFiles.length > 0) {
            debugger
            var ProductImage = initialValues.blogImages
            initalFiles.map((i, index) => {
                ProductImage[index].file = i
            })

            formik.setValues({
                ...formik.values,
                ['blogImages']: ProductImage,
            })
        }
    }, [initalFiles])

    return (
        <Card sx={{ p: 6, mb: 6 }}>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <DropZone
                            onChange={(files) => handleChangeDropZone(files)}
                        />

                        <Grid container spacing={3} mt={2}>
                            {formik.values?.blogImages?.map((i, index) => {
                                return (
                                    <Grid item xs={6}>
                                        <UploadImageBox
                                            key={index}
                                            sx={{
                                                width: '100%',
                                                height: '250px',
                                            }}
                                        >
                                            <BazaarImage
                                                src={
                                                    (i.file as unknown as any)
                                                        ?.preview
                                                }
                                                sx={{ objectFit: 'cover' }}
                                                width="100%"
                                            />
                                            <StyledClear
                                                onClick={handleFileDelete(
                                                    i.file
                                                )}
                                            />
                                        </UploadImageBox>
                                        <Box>
                                            <TextField
                                                fullWidth
                                                sx={{ mt: 4 }}
                                                color="info"
                                                size="small"
                                                type="number"
                                                name={`blogImages[${index}].sortOrder`}
                                                onBlur={formik.handleBlur}
                                                placeholder="Order"
                                                onChange={formik.handleChange}
                                                value={
                                                    formik.values.blogImages[
                                                        index
                                                    ]?.sortOrder
                                                }
                                                label="Order"
                                            />
                                        </Box>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Grid>

                    <Grid item sm={6} xs={12} mt={5}>
                        <Button variant="contained" color="info" type="submit">
                            Save Images
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Card>
    )
}

export default BlogDropZoneImages
