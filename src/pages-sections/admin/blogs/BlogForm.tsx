import { FC } from 'react'
import {
    Button,
    Card,
    FormControlLabel,
    Grid,
    Switch,
    TextField,
    useTheme,
} from '@mui/material'
import { useFormik } from 'formik'
import { TBlogs } from 'types/TBlogs'

type Props = {
    initialValues: TBlogs
    handleFormSubmit: (values: TBlogs) => void
}

const BlogForm: FC<Props> = (props) => {
    const { initialValues, handleFormSubmit } = props

    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        onSubmit: handleFormSubmit,
        validateOnBlur: false,
        validateOnChange: false,
    })

    return (
        <Card sx={{ p: 6 }}>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item sm={12} xs={12}>
                        <TextField
                            fullWidth
                            name="title"
                            label="Title"
                            color="info"
                            size="small"
                            placeholder="Title"
                            value={formik.values.title ?? ''}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            error={
                                !!formik.touched.title && !!formik.errors.title
                            }
                            helperText={
                                (formik.touched.title &&
                                    formik.errors.title) as string
                            }
                        />
                    </Grid>
                    <Grid item sm={12} xs={12}>
                        <TextField
                            multiline
                            rows={4}
                            fullWidth
                            name="description"
                            label="Description"
                            color="info"
                            size="small"
                            placeholder="Description"
                            value={formik.values.description ?? ''}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            error={
                                !!formik.touched.title && !!formik.errors.title
                            }
                            helperText={
                                (formik.touched.title &&
                                    formik.errors.title) as string
                            }
                        />
                    </Grid>

                    <Grid item sm={12} xs={12}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={formik.values.published}
                                    onChange={(e) =>
                                        formik.setFieldValue(
                                            'published',
                                            e.target.checked
                                        )
                                    }
                                />
                            }
                            label="Published ?"
                        />
                    </Grid>

                    <Grid item sm={6} xs={12}>
                        <Button variant="contained" color="info" type="submit">
                            Save Blog
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Card>
    )
}

export default BlogForm
