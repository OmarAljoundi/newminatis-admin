import { FC } from 'react'
import { Button, Card, Grid, MenuItem, Stack, TextField } from '@mui/material'
import { FormikProps, useFormik } from 'formik'
import { TProduct, _colorsOptions } from 'types/TProduct'
import { TProductSizeGuide } from 'types/TProductSizeGuide'
import { FlexBetween } from 'components/flex-box'
import { Clear } from '@mui/icons-material'
import { styled } from '@mui/system'

// ================================================================
type ProductFormProps = {
    formik: FormikProps<TProduct>
}

// ================================================================

const StyledClear = styled(Clear)(() => ({
    top: 5,
    right: 5,
    fontSize: 18,
    cursor: 'pointer',
    position: 'absolute',
    border: '2px solid black',
    borderRadius: '8px',
}))

const ProductSizeGuide: FC<ProductFormProps> = (props) => {
    const { formik } = props

    const handleSizeDelete = (index: number) => {
        var newSizesGuide = formik.values.productSizeGuide.filter(
            (item, _index) => _index != index
        )

        formik.setValues({
            ...formik.values,
            ['productSizeGuide']: newSizesGuide,
        })
    }
    const AddNewSize = () => {
        var sizeGuide: TProductSizeGuide = {
            id: 0,
            productId: formik.values.id,
            sortOrder: formik.values.productSizeGuide?.length + 1 ?? 1,
        }
        formik.setValues({
            ...formik.values,
            ['productSizeGuide']: [
                ...formik.values.productSizeGuide,
                sizeGuide,
            ],
        })
    }

    return (
        <Card sx={{ p: 6, mb: 6 }}>
            <form onSubmit={formik.handleSubmit}>
                <FlexBetween justifyContent={'space-between'} mb={4}>
                    <Button
                        onClick={AddNewSize}
                        variant="contained"
                        color="marron"
                    >
                        Add New Sizing
                    </Button>
                    <Button variant="contained" color="info" type="submit">
                        Save Sizing
                    </Button>
                </FlexBetween>
                <Grid container spacing={3}>
                    {formik.values.productSizeGuide.map((item, index) => (
                        <Grid item xs={4}>
                            <Stack
                                spacing={3}
                                border={'2px dashed #be7374'}
                                p={3}
                                borderRadius={'4px'}
                                sx={{
                                    boxShadow:
                                        'rgb(38, 57, 77) 0px 20px 30px -10px',
                                }}
                                position={'relative'}
                            >
                                <StyledClear
                                    onClick={() => handleSizeDelete(index)}
                                />
                                <TextField
                                    select
                                    fullWidth
                                    color="info"
                                    size="small"
                                    name={`productSizeGuide[${index}].size`}
                                    onBlur={formik.handleBlur}
                                    placeholder="Size"
                                    onChange={formik.handleChange}
                                    value={item.size}
                                    label="Select Size"
                                >
                                    {[
                                        'S',
                                        'M',
                                        'L',
                                        'XL',
                                        'FREE SIZE',
                                        'S/M',
                                        'L/XL',
                                    ].map((item) => (
                                        <MenuItem value={item}>{item}</MenuItem>
                                    ))}
                                </TextField>
                                <FlexBetween columnGap={3}>
                                    <TextField
                                        fullWidth
                                        name={`productSizeGuide[${index}].length`}
                                        label="Length"
                                        color="info"
                                        size="small"
                                        placeholder="Length"
                                        value={item.length}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                    />

                                    <TextField
                                        fullWidth
                                        name={`productSizeGuide[${index}].chest`}
                                        label="Chest"
                                        color="info"
                                        size="small"
                                        placeholder="Chest"
                                        value={item.chest}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                    />
                                </FlexBetween>
                                <FlexBetween columnGap={3}>
                                    <TextField
                                        fullWidth
                                        name={`productSizeGuide[${index}].shoulder`}
                                        label="Shoulder"
                                        color="info"
                                        size="small"
                                        placeholder="Shoulder"
                                        value={item.shoulder}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                    />
                                    <TextField
                                        fullWidth
                                        name={`productSizeGuide[${index}].sleeveLength`}
                                        label="SleeveLength"
                                        color="info"
                                        size="small"
                                        placeholder="SleeveLength"
                                        value={item.sleeveLength}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                    />
                                </FlexBetween>
                                <FlexBetween columnGap={3}>
                                    <TextField
                                        fullWidth
                                        name={`productSizeGuide[${index}].sleeveOpening`}
                                        label="SleeveOpening"
                                        color="info"
                                        size="small"
                                        placeholder="SleeveOpening"
                                        value={item.sleeveOpening}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                    />

                                    <TextField
                                        fullWidth
                                        name={`productSizeGuide[${index}].frontCrotch`}
                                        label="FrontCrotch"
                                        color="info"
                                        size="small"
                                        placeholder="FrontCrotch"
                                        value={item.frontCrotch}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                    />
                                </FlexBetween>

                                <FlexBetween columnGap={3}>
                                    <TextField
                                        fullWidth
                                        name={`productSizeGuide[${index}].waist`}
                                        label="Waist"
                                        color="info"
                                        size="small"
                                        placeholder="Waist"
                                        value={item.waist}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                    />
                                    <TextField
                                        fullWidth
                                        type="number"
                                        name={`productSizeGuide[${index}].sortOrder`}
                                        label="Order"
                                        color="info"
                                        size="small"
                                        placeholder="Order"
                                        value={item.sortOrder}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                    />
                                </FlexBetween>
                                <FlexBetween columnGap={3}>
                                    <TextField
                                        fullWidth
                                        name={`productSizeGuide[${index}].armhole`}
                                        label="Armhole"
                                        color="info"
                                        size="small"
                                        placeholder="Armhole"
                                        value={item.armhole}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                    />
                                    <TextField
                                        fullWidth
                                        type="number"
                                        name={`productSizeGuide[${index}].bottom`}
                                        label="Bottom"
                                        color="info"
                                        size="small"
                                        placeholder="Bottom"
                                        value={item.bottom}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                    />
                                </FlexBetween>
                            </Stack>
                        </Grid>
                    ))}
                </Grid>
            </form>
        </Card>
    )
}

export default ProductSizeGuide
