import { ChangeEvent, ReactElement, useEffect, useState } from 'react'
import { Box, Button, Card, Stack, Table, TableContainer } from '@mui/material'
import TableBody from '@mui/material/TableBody'
import TableHeader from 'components/data-table/TableHeader'
import TablePagination from 'components/data-table/TablePagination'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import { H3 } from 'components/Typography'
import useMuiTable from 'hooks/useMuiTable'
import Scrollbar from 'components/Scrollbar'
import { ProductRow } from 'pages-sections/admin'
import { useNavigate } from 'react-router-dom'
import { IProductResponse } from 'interface/IProductResponse'
import useProductService from 'hooks/useProductService'
import { eFilterOperator, Order, SearchQuery } from 'types/TSearchQuery'
import { useQuery } from 'react-query'
import useDebounce from 'hooks/useDebounceService'
import { FlexBox } from 'components/flex-box'
import SearchInput from 'components/SearchInput'
import { Add } from '@mui/icons-material'

const tableHeading = [
    { id: 'id', label: 'Id', align: 'left' },
    { id: 'name', label: 'Name', align: 'left' },
    { id: 'ProductCategory.Name', label: 'Category', align: 'left' },
    { id: 'action', label: 'Stcok', align: 'left' },
    { id: 'price', label: 'Price', align: 'left' },
    { id: 'SalePrice', label: 'Discount', align: 'left' },
    { id: 'Priority', label: 'Priority', align: 'left' },
    { id: 'Status', label: 'Published', align: 'left' },
    { id: 'action', label: 'Action', align: 'center' },
]

// =============================================================================
ProductList.getLayout = function getLayout(page: ReactElement) {
    return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}
// =============================================================================

// =============================================================================

export default function ProductList() {
    const { onSearchProducts, CreateLoad } = useProductService()
    const [query, setQuery] = useState<string>('')
    const debouncedValue = useDebounce<string>(query, 750)
    const {
        order,
        orderBy,
        selected,
        handleChangePage,
        handleRequestSort,
        rowsPerPage,
        page,
    } = useMuiTable({ listData: [], PerPage: 40 })

    const route = useNavigate()

    const fetchProducts = async () => {
        var _SQ: SearchQuery = {
            FilterByOptions: [],
            OrderByOptions: [],
            PageIndex: page,
            PageSize: 40,
        }
        if (orderBy == 'action' || orderBy == '') {
            _SQ.OrderByOptions.push({
                MemberName: 'createdDate',
                SortOrder: Order.DESC,
            })
        } else {
            _SQ.OrderByOptions.push({
                MemberName: orderBy,
                SortOrder: order == 'desc' ? Order.DESC : Order.ASC,
            })
        }

        if (query) {
            _SQ.FilterByOptions.push({
                FilterFor: query,
                MemberName: 'name',
                FilterOperator: eFilterOperator.EqualsTo,
            })
        }

        return (await onSearchProducts(_SQ)) as IProductResponse
    }

    const {
        data: _response,
        refetch,
        isLoading,
    } = useQuery([], () => fetchProducts(), {
        refetchOnWindowFocus: false,
        keepPreviousData: true,
    })

    useEffect(() => {
        refetch()
    }, [page, orderBy, order, debouncedValue])

    const handleChangeQuery = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value)
    }

    return (
        <Box py={4}>
            <H3 mb={2}>Product List</H3>

            <FlexBox
                mb={2}
                gap={2}
                justifyContent="space-between"
                flexWrap="wrap"
            >
                <SearchInput
                    placeholder={'Search Product Name ..'}
                    value={query}
                    onChange={handleChangeQuery}
                />

                <Button
                    color="info"
                    fullWidth={false}
                    variant="contained"
                    startIcon={<Add />}
                    sx={{ minHeight: 44 }}
                    onClick={() => route('/product')}
                >
                    Add New Product
                </Button>
            </FlexBox>

            <Card>
                <Scrollbar autoHide={false}>
                    <TableContainer sx={{ minWidth: 900 }}>
                        <Table>
                            <TableHeader
                                order={order}
                                hideSelectBtn
                                orderBy={orderBy}
                                heading={tableHeading}
                                rowCount={_response?.products?.length ?? 0}
                                numSelected={selected.length}
                                onRequestSort={handleRequestSort}
                            />

                            <TableBody>
                                {_response?.products?.map((product, index) => (
                                    <ProductRow product={product} key={index} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>

                <Stack alignItems="center" my={4}>
                    <TablePagination
                        onChange={handleChangePage}
                        count={Math.ceil(
                            (_response?.total ?? 10) / rowsPerPage
                        )}
                    />
                </Stack>
            </Card>
        </Box>
    )
}
