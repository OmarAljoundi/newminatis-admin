import { FC, useState } from 'react'
import { Avatar } from '@mui/material'
import { Delete, Edit, RemoveRedEye } from '@mui/icons-material'
import BazaarSwitch from 'components/BazaarSwitch'
import {
    StyledTableRow,
    CategoryWrapper,
    StyledIconButton,
    StyledTableCell,
} from './StyledComponents'
import { TProductCategory } from 'types/TProductCategory'
import AddCategory from 'components/categories/AddCategory'
import { notifySuccess } from 'service/toasterService'
import * as yup from 'yup'
import useProductService from 'hooks/useProductService'
import { Link } from 'react-router-dom'

// ========================================================================
type CategoryRowProps = {
    item: TProductCategory
    selected: any[]
    handleDeleteCategory: () => void
}

const validationSchema = yup.object().shape({})
// ========================================================================

const CategoryRow: FC<CategoryRowProps> = ({
    item,
    selected,
    handleDeleteCategory,
}) => {
    const [categroy, setCategory] = useState<TProductCategory>(item)
    const isItemSelected = selected.indexOf(categroy.name) !== -1
    const [open, setOpen] = useState<boolean>(false)
    const { onPostCategory } = useProductService()

    const handleClose = () => {
        setOpen(false)
    }

    const handleFormSubmit = async (e: TProductCategory) => {
        const result = (await onPostCategory(e)) as TProductCategory
        if (result) {
            notifySuccess('Category Updated Successfully')
            setCategory(result)
            handleClose()
        }
    }

    const handleCreateCategory = () => {
        setOpen(true)
    }

    return (
        <>
            <AddCategory
                handleClose={handleClose}
                handleFormSubmit={handleFormSubmit}
                initialValues={categroy}
                open={open}
                textAction={'Update Category'}
                validationSchema={validationSchema}
            />

            <StyledTableRow
                tabIndex={-1}
                role="checkbox"
                selected={isItemSelected}
            >
                <StyledTableCell align="left">#{categroy.id}</StyledTableCell>

                <StyledTableCell align="left">
                    <CategoryWrapper>{categroy.name}</CategoryWrapper>
                </StyledTableCell>

                <StyledTableCell align="left">
                    {categroy.description}
                </StyledTableCell>
                <StyledTableCell align="left">
                    {categroy.productSubCategory
                        ?.map((x) => x.name)
                        ?.join(', ')}
                </StyledTableCell>

                <StyledTableCell align="center">
                    <Link to={`/categories/${categroy.id}`}>
                        <StyledIconButton>
                            <Edit />
                        </StyledIconButton>
                    </Link>

                    <StyledIconButton>
                        <Delete onClick={handleDeleteCategory} />
                    </StyledIconButton>
                </StyledTableCell>
            </StyledTableRow>
        </>
    )
}

export default CategoryRow
