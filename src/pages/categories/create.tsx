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
import CategoryForm from 'pages-sections/admin/categories/CategoryForm'
import SubCategoryForm from 'pages-sections/admin/categories/SubCategoryForm'

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
// =============================================================================

export default function CreateCategory() {
    const { onPostCategory, CreateLoad } = useProductService()

    const navigate = useNavigate()
    const [selectedOption, setSelectedOption] = useState(0)
    const handleOptionClick = (_, value: number) => setSelectedOption(value)

    const initialValues: TProductCategory = {
        id: 0,
        createdDate: null,
        description: '',
        modifiedDate: null,
        name: '',
        productSubCategory: [],
        seoDescription: null,
        seoTags: null,
        seoTitle: null,
    }

    const handleFormSubmit = async (e: TProductCategory) => {
        e.description = e.name
            .trim()
            .replaceAll('’', '')
            .replaceAll(' ', '-')
            .replaceAll('/', '-')
            .replaceAll("'", '')
            .toLowerCase()

        e.productSubCategory?.map((item) => {
            item.description = item.name
                .trim()
                .replaceAll('’', '')
                .replaceAll(' ', '-')
                .replaceAll('/', '-')
                .replaceAll("'", '')
                .toLowerCase()
        })
        const result = (await onPostCategory(e)) as TProductCategory
        if (result) {
            notifySuccess('Category Created Successfully')
            navigate(`/categories/${result.id}`)
        }
    }
    const formik = useFormik({
        initialValues: initialValues,
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
                    label={'Category'}
                    sx={{
                        fontSize: '22px',
                    }}
                />

                <Tab
                    className="inner-tab"
                    label={'Sub Categories'}
                    sx={{
                        fontSize: '22px',
                    }}
                />
            </StyledTabs>

            {selectedOption == 0 && formik.values && (
                <CategoryForm formik={formik} />
            )}
            {selectedOption == 1 && formik.values && (
                <SubCategoryForm formik={formik} />
            )}
        </Box>
    )
}
