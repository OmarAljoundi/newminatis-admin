import { ReactElement, useState } from 'react'
import { Box, Card, Stack, Table, TableContainer } from '@mui/material'
import TableBody from '@mui/material/TableBody'
import SearchArea from 'components/dashboard/SearchArea'
import TableHeader from 'components/data-table/TableHeader'
import TablePagination from 'components/data-table/TablePagination'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import { H3 } from 'components/Typography'
import useMuiTable from 'hooks/useMuiTable'
import Scrollbar from 'components/Scrollbar'
import { CategoryRow } from 'pages-sections/admin'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { TProductCategory } from 'types/TProductCategory'
import { notifySuccess } from 'service/toasterService'
import useProductService from 'hooks/useProductService'

// TABLE HEADING DATA LIST
const tableHeading = [
    { id: 'id', label: 'ID', align: 'left' },
    { id: 'name', label: 'Name', align: 'left' },
    { id: 'description', label: 'Permalink', align: 'left' },
    { id: 'productSubCategory', label: 'Sub Categories', align: 'left' },
    { id: 'action', label: 'Action', align: 'center' },
]

export default function CategoryList() {
    const categories = useLoaderData() as TProductCategory[]
    const navigate = useNavigate()
    const [categoriesState, setCategoriesState] =
        useState<TProductCategory[]>(categories)
    const { onDeleteCategroy } = useProductService()

    const {
        order,
        orderBy,
        selected,
        rowsPerPage,
        filteredList,
        handleChangePage,
        handleRequestSort,
    } = useMuiTable({
        listData: categoriesState,
        defaultSort: 'id',
        defaultOrder: 'desc',
    })

    const handleCreateCategory = () => {
        navigate('/categories/create')
    }

    const handleDeleteCategory = async (id) => {
        const result = (await onDeleteCategroy(id)) as number
        if (result == 200) {
            notifySuccess('Category Deleted Successfully')
            let updatedState = categoriesState
            updatedState = updatedState.filter((x) => x.id !== id)
            setCategoriesState(updatedState)
        }
    }

    return (
        <Box py={4}>
            <H3 mb={2}>Product Categories</H3>

            <SearchArea
                handleSearch={() => {}}
                buttonText="Add Category"
                handleBtnClick={handleCreateCategory}
                searchPlaceholder="Search Category..."
            />

            <Card>
                <Scrollbar>
                    <TableContainer sx={{ minWidth: 900 }}>
                        <Table>
                            <TableHeader
                                order={order}
                                hideSelectBtn
                                orderBy={orderBy}
                                heading={tableHeading}
                                rowCount={categories.length}
                                numSelected={selected.length}
                                onRequestSort={handleRequestSort}
                            />

                            <TableBody>
                                {filteredList.map((category) => (
                                    <CategoryRow
                                        item={category}
                                        key={category.id}
                                        selected={selected}
                                        handleDeleteCategory={() =>
                                            handleDeleteCategory(category.id)
                                        }
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>

                <Stack alignItems="center" my={4}>
                    <TablePagination
                        onChange={handleChangePage}
                        count={Math.ceil(categories.length / rowsPerPage)}
                    />
                </Stack>
            </Card>
        </Box>
    )
}
