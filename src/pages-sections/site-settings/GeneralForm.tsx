import { FC, useEffect, useState } from 'react'
import { Box, Button, Divider, Grid, TextField } from '@mui/material'
import ProductService from 'service/ProductService'
import { TProduct } from 'types/TProduct'
import { TProductUpdateRequest } from 'types/TUpdateProductRequest'
import SettingService from 'service/SettingService'
import { notifySuccess } from 'service/toasterService'
import Select from 'react-select'
import { MapColors } from 'helpers/Extensions'
import { AxiosResponse } from 'axios'
import { IProductResponse } from 'interface/IProductResponse'
import { useSnackbar } from 'notistack'
import { H1, H3 } from 'components/Typography'

const GeneralForm: FC = () => {
    const [products, setProducts] = useState<TProduct[]>([])
    const [onSaleItems, setOnSaleItems] = useState<TProduct[]>([])
    const [percent, setPercent] = useState<number>(0)
    const [BestSales, setBestSales] = useState<TProduct[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const { enqueueSnackbar } = useSnackbar()

    const handleFormSubmit = async () => {
        products.map((i) => {
            if (BestSales.find((x) => x.name === i.name)) {
                i.isBestSeller = 1
                i.productCategory = null
            } else {
                i.isBestSeller = 0
                i.productCategory = null
            }
        })

        var ProductUpdateRequest: TProductUpdateRequest = {
            productOnSale: products,
        }

        const result = await SettingService.updateProductSale(
            ProductUpdateRequest
        )
        if (result.data.success) {
            notifySuccess('Updated Successfully')
        }
    }

    const handleFormOnSale = async () => {
        const result = (await ProductService.updateSale({
            percent: percent,
            products: onSaleItems,
        })) as AxiosResponse<IProductResponse>

        if (result.data.success) {
            notifySuccess('Updated Successfully')
        }
    }
    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        setLoading(true)
        const result = (await ProductService.search()).data
        setProducts(result.products)
        var bestSalesProduct: TProduct[] = []
        result.products.map((i) => {
            if (i.isBestSeller) {
                bestSalesProduct.push(i)
            }
        })
        setOnSaleItems(result.products.filter((x) => x.salePrice > 0))
        setBestSales(bestSalesProduct)
        setLoading(false)
    }

    return (
        <Box>
            <Grid container spacing={3} alignItems={'center'}>
                <Grid item xs={12}>
                    <H3>Most trending</H3>
                    <Divider />
                </Grid>
                <Grid item xs={10}>
                    <Select
                        classNamePrefix="select"
                        isLoading={loading}
                        isClearable={true}
                        isMulti={true}
                        closeMenuOnSelect={false}
                        isSearchable={true}
                        onChange={(x) => setBestSales(x as TProduct[])}
                        options={products}
                        value={BestSales}
                        getOptionLabel={(x) =>
                            `${x.friendlyName} - ${MapColors(x.color)}`
                        }
                        getOptionValue={(x) => x.id.toString()}
                        name="color"
                        placeholder={'Select Items'}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Button
                        type="submit"
                        color="info"
                        variant="contained"
                        onClick={handleFormSubmit}
                    >
                        Save Changes
                    </Button>
                </Grid>

                <Grid item xs={12}>
                    <H3>On Sale Items</H3>
                    <Divider />
                </Grid>

                <Grid item xs={9}>
                    <Select
                        classNamePrefix="select"
                        isClearable={true}
                        isLoading={loading}
                        isMulti={true}
                        closeMenuOnSelect={false}
                        isSearchable={true}
                        onChange={(x) => setOnSaleItems(x as TProduct[])}
                        options={products}
                        value={onSaleItems}
                        getOptionLabel={(x) =>
                            `${x.friendlyName} - ${MapColors(x.color)} - off %${
                                x.salePrice
                            }`
                        }
                        getOptionValue={(x) => x.id.toString()}
                        name="color"
                        placeholder={'Select On Sale Items'}
                    />
                </Grid>
                <Grid item xs={1}>
                    <TextField
                        onChange={(x) =>
                            setPercent(x.target.value as unknown as number)
                        }
                        value={percent}
                        placeholder={'Select Percentage'}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Button
                        type="submit"
                        color="info"
                        variant="contained"
                        onClick={handleFormOnSale}
                    >
                        Update Sale Price
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default GeneralForm
