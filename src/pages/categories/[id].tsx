import { useEffect, useState } from 'react'
import {
    Backdrop,
    Box,
    CircularProgress,
    styled,
    Tab,
    Tabs,
} from '@mui/material'
import useProductService from 'hooks/useProductService'
import { TProductCategory } from 'types/TProductCategory'
import { notifySuccess } from 'service/toasterService'
import { useParams } from 'react-router-dom'
import { useFormik } from 'formik'
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

export default function EditCategory() {
    const [initialValues, setInitialValues] = useState<TProductCategory>(null)
    const { onPostCategory, CreateLoad, onGetCategories } = useProductService()
    const { id } = useParams()
    const fetchCategory = async () => {
        const result = (await onGetCategories()) as TProductCategory[]
        setInitialValues(result.find((x) => x.id == Number(id)))
    }

    useEffect(() => {
        fetchCategory()
    }, [])

    const [selectedOption, setSelectedOption] = useState(0)
    const handleOptionClick = (_, value: number) => setSelectedOption(value)

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
            setInitialValues(result)
            notifySuccess('Category Created Successfully')
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
