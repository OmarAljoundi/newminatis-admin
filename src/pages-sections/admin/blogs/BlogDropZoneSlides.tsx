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
import { TBlogs, TBlogSlides } from 'types/TBlogs'

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

const BlogDropZoneSlides: FC<BlogDropZoneProps> = (props) => {
    const { initialValues, handleFormSubmit, initalFiles } = props

    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        onSubmit: handleFormSubmit,
        validateOnBlur: false,
        validateOnChange: false,
    })

    const handleChangeDropZone = (files: File[]) => {
        var init: TBlogSlides[] = []
        files.forEach((file) => {
            var x: TBlogSlides = {
                id: 0,
                file: Object.assign(file, {
                    preview: URL.createObjectURL(file),
                }),
                sortOrder: 0,
                blogId: initialValues.id,
                imageUrl: '',
                text: '',
            }
            init.push(x)
        })

        formik.setValues({
            ...formik.values,
            ['blogSlides']: [...formik.values.blogSlides, ...init],
        })
    }

    const handleFileDelete = (file: FileType) => () => {
        const files = formik.values.blogSlides.filter(
            (item) => item.file.name !== file.name
        )

        formik.setValues({
            ...formik.values,
            ['blogSlides']: files,
        })
    }

    useEffect(() => {
        if (initalFiles && initalFiles.length > 0) {
            debugger
            var _blogSlides = initialValues.blogSlides
            initalFiles.map((i, index) => {
                _blogSlides[index].file = i
            })

            formik.setValues({
                ...formik.values,
                ['blogSlides']: _blogSlides,
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
                            {formik.values?.blogSlides?.map((i, index) => {
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
                                                name={`blogSlides[${index}].sortOrder`}
                                                onBlur={formik.handleBlur}
                                                placeholder="Order"
                                                onChange={formik.handleChange}
                                                value={
                                                    formik.values.blogSlides[
                                                        index
                                                    ]?.sortOrder
                                                }
                                                label="Order"
                                            />
                                        </Box>
                                        <Box>
                                            <TextField
                                                fullWidth
                                                color="info"
                                                size="small"
                                                type="text"
                                                name={`blogSlides[${index}].text`}
                                                onBlur={formik.handleBlur}
                                                placeholder="Text"
                                                onChange={formik.handleChange}
                                                value={
                                                    formik.values.blogSlides[
                                                        index
                                                    ]?.text
                                                }
                                                label="Text"
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

export default BlogDropZoneSlides
