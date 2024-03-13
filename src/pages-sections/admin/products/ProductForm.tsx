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
import { FormikProps, useFormik } from 'formik'
import ReactSelect from 'react-select'

import { TProductCategory } from 'types/TProductCategory'
import { eColor, TProduct, _colorsOptions } from 'types/TProduct'
import { TProductVariant } from 'types/TProductVariant'
import { convertStringToArray } from 'helpers/Extensions'
import { TProductTags } from 'types/TProductTags'
import { H2 } from 'components/Typography'
import MultiSelectSort from './ProductSortableSelect'
import TextEditor from 'components/TextEditor'
import { Pants_Product_Type, TShirt_Product_Type } from 'utils/constants'

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
    formik: FormikProps<TProduct>
    categories: TProductCategory[]
    variants: TProductVariant[]
    productTags: TProductTags[]
    products: TProduct[]
}

// ================================================================

function getStyles(name: string, personName: readonly string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    }
}

const ProductForm: FC<ProductFormProps> = (props) => {
    const theme = useTheme()

    const handleEditorChange = (newContent: string) => {
        formik.setFieldValue('description', newContent)
    }

    const { formik, categories, variants, productTags, products } = props

    const getCategoriesValue = (selected: string[]) => {
        var subs = categories.find(
            (x) => x.id == formik.values?.categoryId
        )?.productSubCategory
        if (selected && subs?.length > 0) {
            return subs
                ?.filter((z) => selected.find((x) => x == z.id.toString()))
                .map((x) => x.name)
        }
        return []
    }
    return (
        <Card sx={{ p: 6, overflow: 'visible' }}>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item sm={4} xs={12}>
                        <TextField
                            fullWidth
                            name="name"
                            label="Name"
                            color="info"
                            size="small"
                            placeholder="Name"
                            value={formik.values?.name ?? ''}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            error={
                                !!formik.touched.name && !!formik.errors.name
                            }
                            helperText={
                                (formik.touched.name &&
                                    formik.errors.name) as string
                            }
                        />
                    </Grid>
                    <Grid item sm={4} xs={12}>
                        <TextField
                            fullWidth
                            name="friendlyName"
                            label="Friendly Name"
                            color="info"
                            size="small"
                            placeholder="Friendly Name"
                            value={formik.values?.friendlyName ?? ''}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                        />
                    </Grid>

                    <Grid item sm={4} xs={12}>
                        <TextField
                            select
                            fullWidth
                            color="info"
                            size="small"
                            name="categoryId"
                            onBlur={formik.handleBlur}
                            placeholder="Category"
                            onChange={(e) => {
                                formik.setFieldValue('subCategory', [])
                                formik.setFieldValue(
                                    'categoryId',
                                    e.target.value
                                )
                            }}
                            value={formik.values?.categoryId ?? 0}
                            label="Select Category"
                            error={
                                !!formik.touched.categoryId &&
                                !!formik.errors.categoryId
                            }
                            helperText={
                                (formik.touched.categoryId &&
                                    formik.errors.categoryId) as string
                            }
                        >
                            {categories.map((item) => (
                                <MenuItem value={item.id}>{item.name}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid item sm={4} xs={12}>
                        <TextField
                            disabled
                            fullWidth
                            name="sku"
                            label="SKU"
                            color="info"
                            size="small"
                            placeholder="SKU"
                            value={formik.values?.sku}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            error={!!formik.touched.sku && !!formik.errors.sku}
                            helperText={
                                (formik.touched.sku &&
                                    formik.errors.sku) as string
                            }
                        />
                    </Grid>
                    <Grid item sm={4} xs={6}>
                        <TextField
                            select
                            fullWidth
                            color="info"
                            size="small"
                            name="status"
                            onBlur={formik.handleBlur}
                            placeholder="Status"
                            onChange={formik.handleChange}
                            value={formik.values?.status ?? true}
                            label="Select Status"
                            error={
                                !!formik.touched.status &&
                                !!formik.errors.status
                            }
                            helperText={
                                (formik.touched.status &&
                                    formik.errors.status) as string
                            }
                        >
                            <MenuItem value={'1'}>Active</MenuItem>
                            <MenuItem value={'0'}>Disable</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item sm={4} xs={6}>
                        <TextField
                            select
                            fullWidth
                            color="info"
                            size="small"
                            name="color"
                            onBlur={formik.handleBlur}
                            placeholder="Color"
                            onChange={formik.handleChange}
                            value={formik.values?.color ?? eColor.Black}
                            label="Select Color"
                            error={
                                !!formik.touched.color && !!formik.errors.color
                            }
                            helperText={
                                (formik.touched.color &&
                                    formik.errors.color) as string
                            }
                        >
                            {_colorsOptions.map((item) => (
                                <MenuItem value={item.value}>
                                    {item.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid item sm={6} xs={12}>
                        <TextField
                            disabled
                            fullWidth
                            color="primary"
                            size="small"
                            value={'Size'}
                            label="Variant Type"
                            placeholder="Variant Type"
                        />
                    </Grid>

                    <Grid item sm={6} xs={12}>
                        <FormControl sx={{ width: '100%' }}>
                            <InputLabel
                                id="demo-multiple-chip-label"
                                sx={{
                                    top: '-7px',
                                    '&.Mui-focused': {
                                        top: '0',
                                    },
                                }}
                            >
                                Variables
                            </InputLabel>
                            <Select
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                label="Variables"
                                fullWidth
                                size="small"
                                multiple
                                name={`sizes`}
                                value={convertStringToArray(
                                    formik.values?.sizes
                                )}
                                onChange={formik.handleChange}
                                input={
                                    <OutlinedInput
                                        label="Variables"
                                        fullWidth
                                        size="small"
                                    />
                                }
                                renderValue={(selected) => (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            gap: 0.5,
                                        }}
                                    >
                                        {convertStringToArray(selected).map(
                                            (value) => (
                                                <Chip
                                                    key={value}
                                                    label={value}
                                                    sx={{
                                                        height: '20px',
                                                    }}
                                                />
                                            )
                                        )}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                            >
                                {['S', 'M', 'L', 'XL', 'F', 'S/M', 'L/XL'].map(
                                    (name) => (
                                        <MenuItem
                                            key={name}
                                            value={name}
                                            style={getStyles(
                                                name,
                                                (formik.values
                                                    ?.sizes as string[]) ?? [],
                                                theme
                                            )}
                                        >
                                            {name}
                                        </MenuItem>
                                    )
                                )}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item sm={6} xs={12}>
                        <TextField
                            disabled
                            fullWidth
                            color="primary"
                            size="small"
                            value={'Tags'}
                            label="Tags"
                        />
                    </Grid>

                    <Grid item sm={6} xs={12}>
                        <FormControl sx={{ width: '100%' }}>
                            <InputLabel
                                id="demo-multiple-chip-label"
                                sx={{
                                    top: '-7px',
                                    '&.Mui-focused': {
                                        top: '0',
                                    },
                                }}
                            >
                                Tags
                            </InputLabel>
                            <Select
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                label="Variables"
                                fullWidth
                                size="small"
                                multiple
                                name={`tags`}
                                value={convertStringToArray(
                                    formik.values?.tags
                                )}
                                onChange={formik.handleChange}
                                input={
                                    <OutlinedInput
                                        label="Tags"
                                        fullWidth
                                        size="small"
                                    />
                                }
                                renderValue={(selected) => (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            gap: 0.5,
                                        }}
                                    >
                                        {convertStringToArray(selected).map(
                                            (value) => (
                                                <Chip
                                                    key={value}
                                                    label={value}
                                                    sx={{
                                                        height: '20px',
                                                    }}
                                                />
                                            )
                                        )}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                            >
                                {productTags?.map((item) => (
                                    <MenuItem
                                        key={item.id}
                                        value={item.name}
                                        style={getStyles(
                                            item.name,
                                            (formik.values?.tags as string[]) ??
                                                [],
                                            theme
                                        )}
                                    >
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item sm={6} xs={12}>
                        <TextField
                            disabled
                            fullWidth
                            color="primary"
                            size="small"
                            value={'SubCategories'}
                            label="SubCategories"
                        />
                    </Grid>

                    <Grid item sm={6} xs={12}>
                        <FormControl sx={{ width: '100%' }}>
                            <InputLabel
                                sx={{
                                    top: '-7px',
                                    '&.Mui-focused': {
                                        top: '0',
                                    },
                                }}
                            >
                                Sub-Categories
                            </InputLabel>
                            <Select
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                label="Variables"
                                fullWidth
                                size="small"
                                multiple
                                name={`subCategory`}
                                value={convertStringToArray(
                                    formik.values?.subCategory
                                )}
                                onChange={formik.handleChange}
                                input={
                                    <OutlinedInput
                                        label="Sub Category"
                                        fullWidth
                                        size="small"
                                    />
                                }
                                renderValue={(selected) => (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            gap: 0.5,
                                        }}
                                    >
                                        {convertStringToArray(
                                            getCategoriesValue(selected)
                                        ).map((value) => (
                                            <Chip
                                                key={value}
                                                label={value}
                                                sx={{
                                                    height: '20px',
                                                }}
                                            />
                                        ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                            >
                                {formik.values?.categoryId
                                    ? categories
                                          .find(
                                              (x) =>
                                                  x.id ==
                                                  formik.values?.categoryId
                                          )
                                          ?.productSubCategory?.map((item) => (
                                              <MenuItem
                                                  key={item.id}
                                                  value={item.id}
                                                  style={getStyles(
                                                      item.name,
                                                      (formik.values
                                                          ?.subCategory as string[]) ??
                                                          [],
                                                      theme
                                                  )}
                                              >
                                                  {item.name}
                                              </MenuItem>
                                          ))
                                    : null}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item sm={12} xs={12}>
                        {formik.values && products.length > 0 && (
                            <MultiSelectSort
                                formik={formik}
                                products={products}
                            />
                        )}
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            color="info"
                            size="small"
                            name="shortDescription"
                            label="Short Description"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            placeholder="Short Description"
                            value={formik.values?.shortDescription}
                            error={
                                !!formik.touched.shortDescription &&
                                !!formik.errors.shortDescription
                            }
                            helperText={
                                (formik.touched.shortDescription &&
                                    formik.errors.shortDescription) as string
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <div>
                            <TextEditor
                                initialValue={formik.values?.description}
                                onEditorChange={handleEditorChange}
                            />
                        </div>
                    </Grid>

                    <Grid item sm={4} xs={12}>
                        <TextField
                            fullWidth
                            name="priority"
                            color="info"
                            size="small"
                            type="number"
                            onBlur={formik.handleBlur}
                            value={formik.values?.priority}
                            label="Priority"
                            onChange={formik.handleChange}
                            placeholder="Priority"
                            error={
                                !!formik.touched.priority &&
                                !!formik.errors.priority
                            }
                            helperText={
                                (formik.touched.priority &&
                                    formik.errors.priority) as string
                            }
                        />
                    </Grid>
                    <Grid item sm={4} xs={12}>
                        <TextField
                            fullWidth
                            name="price"
                            color="info"
                            size="small"
                            type="number"
                            onBlur={formik.handleBlur}
                            value={formik.values?.price}
                            label="Regular Price"
                            onChange={formik.handleChange}
                            placeholder="Regular Price"
                            error={
                                !!formik.touched.price && !!formik.errors.price
                            }
                            helperText={
                                (formik.touched.price &&
                                    formik.errors.price) as string
                            }
                        />
                    </Grid>
                    <Grid item sm={4} xs={12}>
                        <TextField
                            fullWidth
                            color="info"
                            size="small"
                            type="number"
                            name="salePrice"
                            label="Sale Price"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            placeholder="Sale Price"
                            value={formik.values?.salePrice}
                            error={
                                !!formik.touched.salePrice &&
                                !!formik.errors.salePrice
                            }
                            helperText={
                                (formik.touched.salePrice &&
                                    formik.errors.salePrice) as string
                            }
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

export default ProductForm
