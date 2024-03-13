import { ReactElement, useEffect, useState } from 'react'
import {
    Box,
    Card,
    LinearProgress,
    Stack,
    Table,
    TableContainer,
} from '@mui/material'
import TableBody from '@mui/material/TableBody'
import { H3 } from 'components/Typography'
import Scrollbar from 'components/Scrollbar'
import SearchArea from 'components/dashboard/SearchArea'
import TableHeader from 'components/data-table/TableHeader'
import TablePagination from 'components/data-table/TablePagination'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import useMuiTable from 'hooks/useMuiTable'
import { CustomerRow } from 'pages-sections/admin'
import api from 'utils/__api__/dashboard'
import {
    FilterByOptions,
    OrderByOptions,
    SearchQuery,
} from 'types/TSearchQuery'
import { buildOrderBy } from 'helpers/Extensions'
import useUserService from 'hooks/useUserService'
import { IUserResponse } from 'interface/IUserResponse'
import { TUserAddress } from 'types/TUserAddress'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from 'react-query'

// table column list
const tableHeading = [
    { id: 'name', label: 'Name', align: 'left' },
    { id: 'phone', label: 'Phone', align: 'left' },
    { id: 'email', label: 'Email', align: 'left' },
    { id: 'country', label: 'Country/Cite', align: 'left' },
    { id: 'addressLine', label: 'Address', align: 'left' },
    { id: 'createdDate', label: 'CreatedDate', align: 'left' },
]

// =============================================================================
CustomerList.getLayout = function getLayout(page: ReactElement) {
    return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}
// =============================================================================

// =============================================================================

export default function CustomerList() {
    const { onSearchUsers, userLoad } = useUserService()

    const [searchParams] = useSearchParams()
    const { selected, handleChangePage, handleRequestSort, page, rowsPerPage } =
        useMuiTable({
            listData: [],
            PerPage: 10,
        })

    const fetchCustomers = async () => {
        var OrderByOptions: OrderByOptions[] = []
        OrderByOptions = buildOrderBy('desc', 'CreatedDate')
        const _SQ: SearchQuery = {
            FilterByOptions: [],
            OrderByOptions: OrderByOptions,
            PageIndex: page,
            PageSize: rowsPerPage,
        }

        return (await onSearchUsers(_SQ)) as IUserResponse
    }

    const {
        data: _response,
        refetch,
        isLoading,
    } = useQuery([], () => fetchCustomers(), {
        refetchOnWindowFocus: false,
        keepPreviousData: true,
        enabled: !!searchParams,
    })

    useEffect(() => {
        refetch()
    }, [page])

    return (
        <Box py={4}>
            <H3 mb={2}>Customers</H3>
            <Card>
                <Scrollbar>
                    <TableContainer sx={{ minWidth: 900 }}>
                        {(isLoading || userLoad) && (
                            <Box>
                                <LinearProgress color="info" />
                            </Box>
                        )}
                        <Table>
                            <TableHeader
                                order={'desc'}
                                hideSelectBtn
                                orderBy={'CreatedDate'}
                                heading={tableHeading}
                                numSelected={selected.length}
                                rowCount={_response?.total}
                                onRequestSort={handleRequestSort}
                            />

                            <TableBody>
                                {_response?.userAddresses?.map((customer) => (
                                    <CustomerRow
                                        customer={customer}
                                        key={customer?.id}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>

                <Stack alignItems="center" my={4}>
                    <TablePagination
                        onChange={handleChangePage}
                        count={Math.ceil((_response?.total ?? 0) / rowsPerPage)}
                    />
                </Stack>
            </Card>
        </Box>
    )
}

// export const getStaticProps: GetStaticProps = async () => {
//     const customers = await api.customers()
//     return { props: { customers } }
// }
