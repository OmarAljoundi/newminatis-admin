import { ReactElement, useEffect, useState } from 'react'
import {
    Backdrop,
    Box,
    CircularProgress,
    styled,
    Tab,
    Tabs,
} from '@mui/material'
import { ProductForm } from 'pages-sections/admin'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import { TProduct } from 'types/TProduct'
import useProductService from 'hooks/useProductService'
import { TProductCategory } from 'types/TProductCategory'
import { TProductVariant } from 'types/TProductVariant'
import { IProductResponse } from 'interface/IProductResponse'
import { notifyError, notifySuccess } from 'service/toasterService'
import { useNavigate } from 'react-router-dom'
import { convertArrayToString, convertStringToArray } from 'helpers/Extensions'
import { TProductTags } from 'types/TProductTags'
import { SearchQuery } from 'types/TSearchQuery'
import { useFormik } from 'formik'
import axios from 'axios'

// =============================================================================
CreateProduct.getLayout = function getLayout(page: ReactElement) {
    return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}
// =============================================================================
const StyledTabs = styled(Tabs)(({ theme }) => ({
    minHeight: 0,
    marginTop: 80,
    marginBottom: 24,
    borderBottom: `1px solid ${theme.palette.text.disabled}`,
    '& .inner-tab': {
        minHeight: 40,
        fontWeight: 600,
        textTransform: 'capitalize',
    },
}))
export default function CreateProduct() {
    const {
        onGetCategories,
        onCreateProduct,
        onGetTags,
        CreateLoad,
        onSearchProducts,
    } = useProductService()

    const navigate = useNavigate()
    const [categories, setCategories] = useState<TProductCategory[]>([])
    const [variants, setVariants] = useState<TProductVariant[]>([])
    const [productTags, setProductTags] = useState<TProductTags[]>([])
    const [products, setProducts] = useState<TProduct[]>([])
    const [selectedOption, setSelectedOption] = useState(0)
    const handleOptionClick = (_, value: number) => setSelectedOption(value)

    const INITIAL_VALUES: TProduct = {
        id: 0,
        color: null,
        categoryId: null,
        isBestSeller: null,
        createdDate: null,
        description: '',
        discountId: 0,
        ModifiedDate: null,
        name: '',
        price: null,
        salePrice: null,
        productCategory: null,
        sizes: [],
        subSku: [],
        tags: [],
        subCategory: [],
        sku: '',
        files: null,
        status: true,
        productImages: null,
        shortDescription: '',
        mainImage: '',
        friendlyName: '',
        priority: 0,
    }

    const fetchProducts = async () => {
        var Search: SearchQuery = {
            FilterByOptions: [],
            OrderByOptions: [],
            PageIndex: 0,
            PageSize: 0,
        }
        const result = (await onSearchProducts(Search)) as IProductResponse
        if (result.success) {
            setProducts(result.products)
        }
    }
    const collectCategories = async () => {
        let data = (await onGetCategories()) as TProductCategory[]
        setCategories(data)
    }
    const collectTags = async () => {
        let data = (await onGetTags()) as TProductTags[]
        setProductTags(data)
    }

    useEffect(() => {
        Promise.all([fetchProducts(), collectCategories(), collectTags()])
    }, [])

    const handleFormSubmit = async (e: TProduct) => {
        var Product: TProduct = {
            id: e.id,
            color: e.color,
            friendlyName: e.friendlyName,
            mainImage: e.mainImage,
            categoryId: e.categoryId,
            isBestSeller: e.isBestSeller,
            createdDate: e.createdDate,
            description: e.description,
            discountId: e.discountId,
            ModifiedDate: e.ModifiedDate,
            shortDescription: e.shortDescription,
            name: e.name,
            price: e.price,
            salePrice: e.salePrice,
            productCategory: e.productCategory,
            sizes: convertArrayToString(e.sizes),
            tags: convertArrayToString(e.tags),
            subCategory: convertArrayToString(e.subCategory),
            subSku: '',
            sku: e.sku,
            files: e.files,
            status: e.status,
            priority: e.priority,
            type: e.type,
        }
        const result = (await onCreateProduct(Product)) as IProductResponse
        if (result.success) {
            notifySuccess('Product Created Successfully')
            const clearStagingCache = axios({
                method: 'GET',
                url: process.env.REACT_APP_API_REVALIDATE_STAGING,
            })
            const clearProdCache = axios({
                method: 'GET',
                url: process.env.REACT_APP_API_REVALIDATE_PROD,
            })
            Promise.all([clearStagingCache, clearProdCache]).catch((x) => {
                notifyError('Error while clearing the cache, ' + x)
            })
            navigate({
                pathname: `/product/${result.product.id}`,
            })
        } else {
            result.errors.map((item) => {
                notifyError(item)
            })
        }
    }
    const formik = useFormik({
        initialValues: INITIAL_VALUES,
        enableReinitialize: true,
        onSubmit: handleFormSubmit,
        validateOnBlur: false,
        validateOnChange: false,
    })

    return (
        <Box py={4}>
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={CreateLoad}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <StyledTabs
                textColor="primary"
                value={selectedOption}
                indicatorColor="primary"
                onChange={handleOptionClick}
            >
                <Tab
                    className="inner-tab"
                    label={'Product'}
                    sx={{
                        fontSize: {
                            xs: '14px',
                            sm: '14px',
                            md: '25px',
                            lg: '25px',
                        },
                    }}
                />

                <Tab
                    className="inner-tab"
                    label={'Images'}
                    disabled={INITIAL_VALUES.id == 0}
                    sx={{
                        fontSize: {
                            xs: '14px',
                            sm: '14px',
                            md: '25px',
                            lg: '25px',
                        },
                    }}
                />
                <Tab
                    className="inner-tab"
                    label={'Size Guide'}
                    disabled={INITIAL_VALUES?.id == 0}
                    sx={{
                        fontSize: {
                            xs: '14px',
                            sm: '14px',
                            md: '25px',
                            lg: '25px',
                        },
                    }}
                />
            </StyledTabs>
            {selectedOption === 0 && (
                <ProductForm
                    formik={formik}
                    categories={categories}
                    variants={variants}
                    productTags={productTags}
                    products={products}
                />
            )}
        </Box>
    )
}
