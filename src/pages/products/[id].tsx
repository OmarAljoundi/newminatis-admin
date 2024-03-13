import { ReactElement, useEffect, useState } from 'react'
import {
    Backdrop,
    Box,
    Button,
    CircularProgress,
    styled,
    Tab,
    Tabs,
} from '@mui/material'
import * as yup from 'yup'
import { H3 } from 'components/Typography'
import { ProductForm } from 'pages-sections/admin'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import { TProduct } from 'types/TProduct'
import { useLoaderData, useParams } from 'react-router-dom'
import { IProductResponse } from 'interface/IProductResponse'
import useProductService from 'hooks/useProductService'
import { TProductCategory } from 'types/TProductCategory'
import { TProductVariant } from 'types/TProductVariant'
import { notifyError, notifySuccess } from 'service/toasterService'
import { TProductImages } from 'types/TProductImages'
import {
    convertArrayToString,
    convertStringToArray,
    isDuplicateOrder,
} from 'helpers/Extensions'
import ProductDropZone from 'pages-sections/admin/products/ProductDropZone'
import { FileType } from 'pages-sections/site-settings/BannerSlider'
import { TProductTags } from 'types/TProductTags'
import RelatedProducts from 'pages-sections/admin/products/RelatedProducts'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { SearchQuery } from 'types/TSearchQuery'
import ProductSizeGuide from 'pages-sections/admin/products/ProductSizeGuide'
import { useFormik } from 'formik'
import axios from 'axios'
import ProductSeoForm from 'pages-sections/admin/products/ProductSEOForm'

// form field validation schema
const validationSchema = yup.object().shape({})

// =============================================================================
EditProduct.getLayout = function getLayout(page: ReactElement) {
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

export default function EditProduct() {
    const [INITIAL_VALUES, SETINITIAL_VALUES] = useState<TProduct>(null)
    const [products, setProducts] = useState<TProduct[]>([])

    const { id } = useParams()

    const fetchProduct = async () => {
        const result = (await GetById(
            id as unknown as number
        )) as IProductResponse
        if (result.success) {
            SETINITIAL_VALUES(result.product)
        }
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

    const {
        onGetCategories,
        onCreateProduct,
        onUploadImages,
        onGetTags,
        GetById,
        CreateLoad,
        onSearchProducts,
    } = useProductService()
    const [categories, setCategories] = useState<TProductCategory[]>([])
    const [variants, setVariants] = useState<TProductVariant[]>([])
    const [productTags, setProductTags] = useState<TProductTags[]>([])
    const [files, setFiles] = useState<FileType[]>([])
    const [selectedOption, setSelectedOption] = useState(0)
    const handleOptionClick = (_, value: number) => setSelectedOption(value)

    const collectCategories = async () => {
        let data = (await onGetCategories()) as TProductCategory[]
        setCategories(data)
    }
    const collectTags = async () => {
        let data = (await onGetTags()) as TProductTags[]
        setProductTags(data)
    }

    const executeLongRunningtask = async (productImage: TProductImages) => {
        const name = productImage.imageUrl.split('/')[4]
        return new Promise((resolve, reject) => {
            fetch(productImage.imageUrl, {
                headers: { 'Cache-Control': 'no-cache' },
                method: 'GET',
            })
                .then((res) => res.blob())
                .then(
                    (blob) =>
                        new File([blob], `${name}`, {
                            type: blob.type,
                        })
                )
                .then((file) => {
                    resolve(
                        Object.assign(file, {
                            preview: URL.createObjectURL(file),
                        })
                    )
                })
        })
    }

    const executeAllLongRunningTasks = async () => {
        if (
            INITIAL_VALUES?.productImages &&
            INITIAL_VALUES?.productImages.length > 0
        )
            return await Promise.all(
                INITIAL_VALUES?.productImages?.map(executeLongRunningtask)
            )
    }

    useEffect(() => {
        if (INITIAL_VALUES) {
            executeAllLongRunningTasks().then((res) =>
                setFiles(res as FileType[])
            )
        }
    }, [INITIAL_VALUES])

    useEffect(() => {
        Promise.all([
            fetchProduct(),
            collectCategories(),
            collectTags(),
            fetchProducts(),
        ])
    }, [])

    const handleFormSubmit = async (e: TProduct) => {
        var Product: TProduct = {
            id: e.id,
            mainImage: e.mainImage,
            friendlyName: e.friendlyName,
            color: e.color,
            categoryId: e.categoryId,
            isBestSeller: e.isBestSeller,
            createdDate: e.createdDate,
            description: e.description,
            discountId: e.discountId,
            ModifiedDate: e.ModifiedDate,
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
            shortDescription: e.shortDescription,
            relatedProducts: e.relatedProducts,
            productSizeGuide: e.productSizeGuide,
            type: e.type,
            seoDescription: e.seoDescription,
            seoTags: e.seoTags,
            seoTitle: e.seoTitle,
        }

        const result = (await onCreateProduct(Product)) as IProductResponse
        if (result.success) {
            delete result.product.productImages
            SETINITIAL_VALUES((prevState) => ({
                productImages: prevState.productImages,
                ...result.product,
            }))
            notifySuccess('Product Updated Successfully')
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
        }
    }

    const handleUploadImage = async (e: TProduct) => {
        let formData = new FormData()
        e.productImages?.map((item, index) => {
            formData.append('ProductId', INITIAL_VALUES?.id.toString())
            formData.append(`ProductImages[${index}].Id`, '0')
            formData.append(`ProductImages[${index}].File`, item.file)
            formData.append(
                `ProductImages[${index}].ImageOrder`,
                item.imageOrder.toString()
            )
            formData.append(
                `ProductImages[${index}].ProductId`,
                item.productId.toString()
            )
        })
        const result = (await onUploadImages(formData)) as IProductResponse
        if (result.success) {
            let _product = { ...INITIAL_VALUES }
            delete _product.productImages
            SETINITIAL_VALUES((prevState) => ({
                productImages: result.product.productImages,
                ..._product,
            }))
            notifySuccess('Images Uploaded Successfully')
        } else {
            notifyError(`Something went wrong ${result.message}`)
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
        <Box sx={{ mb: 5 }}>
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={CreateLoad}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            {INITIAL_VALUES && (
                <>
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
                        <Tab
                            className="inner-tab"
                            label={'Product SEO'}
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
                    <>
                        {selectedOption === 0 && (
                            <ProductForm
                                formik={formik}
                                categories={categories}
                                variants={variants}
                                productTags={productTags}
                                products={products}
                            />
                        )}
                    </>
                    <>
                        {selectedOption === 1 && (
                            <DndProvider backend={HTML5Backend}>
                                <ProductDropZone
                                    initalFiles={files}
                                    handleFormSubmit={handleUploadImage}
                                    initialValues={INITIAL_VALUES}
                                />
                            </DndProvider>
                        )}
                    </>
                    <>
                        {selectedOption === 2 && (
                            <Box>
                                <ProductSizeGuide formik={formik} />
                            </Box>
                        )}
                    </>
                    <>
                        {selectedOption === 3 && (
                            <Box>
                                <ProductSeoForm formik={formik} />
                            </Box>
                        )}
                    </>
                </>
            )}
        </Box>
    )
}
