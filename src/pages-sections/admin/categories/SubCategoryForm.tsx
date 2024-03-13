import { FC } from 'react'
import { Button, Card, Grid, MenuItem, TextField, Stack } from '@mui/material'
import { FormikProps } from 'formik'

import { TProductCategory } from 'types/TProductCategory'
import { _colorsOptions } from 'types/TProduct'

import { FlexBetween } from 'components/flex-box'
import { TProductSubCategory } from 'types/TProductSubCategory'
import { Clear } from '@mui/icons-material'
import { styled } from '@mui/system'

const StyledClear = styled(Clear)(() => ({
    top: 5,
    right: 5,
    fontSize: 18,
    cursor: 'pointer',
    position: 'absolute',
    border: '2px solid black',
    borderRadius: '8px',
}))

// ================================================================
type ProductFormProps = {
    formik: FormikProps<TProductCategory>
}

// ================================================================

const SubCategoryForm: FC<ProductFormProps> = (props) => {
    const { formik } = props

    const handleSubDelete = (index: number) => {
        var newSubCategories = formik.values.productSubCategory.filter(
            (item, _index) => _index != index
        )

        formik.setValues({
            ...formik.values,
            ['productSubCategory']: newSubCategories,
        })
    }
    const AddNewSub = () => {
        var subcategory: TProductSubCategory = {
            id: 0,
            productCategoryId: formik.values.id,
            description: '',
            name: '',
            seoDescription: null,
            seoTags: null,
            seoTitle: null,
        }
        formik.setValues({
            ...formik.values,
            ['productSubCategory']: [
                ...formik.values.productSubCategory,
                subcategory,
            ],
        })
    }

    return (
        <Card sx={{ p: 6, mb: 6 }}>
            <form onSubmit={formik.handleSubmit}>
                <FlexBetween justifyContent={'space-between'} mb={4}>
                    <Button
                        onClick={AddNewSub}
                        variant="contained"
                        color="marron"
                    >
                        Add Sub Category
                    </Button>
                    <Button variant="contained" color="info" type="submit">
                        Save Sub Category
                    </Button>
                </FlexBetween>
                <Grid container spacing={3}>
                    {formik.values.productSubCategory.map((item, index) => (
                        <Grid item xs={6}>
                            <Stack
                                spacing={3}
                                border={'2px solid #be7374'}
                                p={3}
                                borderRadius={'4px'}
                                position={'relative'}
                            >
                                <StyledClear
                                    onClick={() => handleSubDelete(index)}
                                />

                                <FlexBetween columnGap={3}>
                                    <TextField
                                        fullWidth
                                        color="info"
                                        size="small"
                                        name={`productSubCategory[${index}].name`}
                                        onBlur={formik.handleBlur}
                                        placeholder="Name"
                                        onChange={formik.handleChange}
                                        value={item.name}
                                        label="Sub Name"
                                    />
                                    <TextField
                                        fullWidth
                                        label="Permalink"
                                        color="info"
                                        size="small"
                                        disabled
                                        placeholder="Permalink"
                                        value={item.description}
                                    />
                                </FlexBetween>
                                <FlexBetween columnGap={3}>
                                    <TextField
                                        fullWidth
                                        name={`productSubCategory[${index}].seoTitle`}
                                        label="SEO Title"
                                        color="info"
                                        size="small"
                                        placeholder="SEO Title"
                                        value={item.seoTitle}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                    />
                                    <TextField
                                        fullWidth
                                        name={`productSubCategory[${index}].seoTags`}
                                        label="SEO Tags"
                                        color="info"
                                        size="small"
                                        placeholder="SEO Tags"
                                        value={item.seoTags}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                    />
                                </FlexBetween>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={6}
                                    name={`productSubCategory[${index}].seoDescription`}
                                    label="SEO Description"
                                    color="info"
                                    size="small"
                                    placeholder="SEO Description"
                                    value={item.seoDescription}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                />
                            </Stack>
                        </Grid>
                    ))}
                </Grid>
            </form>
        </Card>
    )
}

export default SubCategoryForm
