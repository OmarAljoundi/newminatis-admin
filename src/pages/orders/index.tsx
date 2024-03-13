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
import TableHeader from 'components/data-table/TableHeader'
import TablePagination from 'components/data-table/TablePagination'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import useMuiTable from 'hooks/useMuiTable'
import { OrderRow } from 'pages-sections/admin'
import Order from 'models/order.model'
import { eOrderStatus, TOrderDto } from 'types/TOrder'
import {
    FilterByOptions,
    OrderByOptions,
    SearchQuery,
} from 'types/TSearchQuery'
import { IOrderResponse } from 'interface/IOrderResponse'
import useOrderService from 'hooks/useOrderService'
import { buildOrderBy } from 'helpers/Extensions'
import { SearchBox } from 'components/search/SearchBox'
import { useQuery } from 'react-query'

export type SearchList = {
    id: string
    label: string
    type: 'number' | 'text' | 'Options' | 'Date' | 'ignored'
    options?: SearchOptions[]
    align: 'left' | 'center' | 'right'
    offOrder?: boolean
    offFilter?: boolean
}

export type SearchOptions = {
    label: string
    value: any
}

var Options: SearchOptions[] = [
    {
        label: 'Processing',
        value: eOrderStatus.Processing,
    },
    {
        label: 'Delieverd',
        value: eOrderStatus.Delieverd,
    },
    {
        label: 'UnderDelievery',
        value: eOrderStatus.UnderDelievery,
    },
    {
        label: 'Canceled',
        value: eOrderStatus.Canceled,
    },
]

var DateOptions: SearchOptions[] = [
    {
        label: 'Today',
        value: 0,
    },
    {
        label: 'Yesterday',
        value: 1,
    },
    {
        label: 'Last 7 Days',
        value: 2,
    },
    {
        label: 'Last 30 day',
        value: 3,
    },
    {
        label: 'Last Month',
        value: 4,
    },
    {
        label: 'This Year',
        value: 5,
    },
]
const tableHeading: SearchList[] = [
    { id: 'Id', label: 'Order ID', align: 'left', type: 'number' },
    {
        id: 'User.Email',
        label: 'Emails',
        align: 'left',
        type: 'text',
        offFilter: true,
    },
    {
        id: 'Quantity',
        label: 'Qty',
        align: 'left',
        offOrder: true,
        type: 'number',
        offFilter: true,
    },
    {
        id: 'CreatedDate',
        label: 'Purchase Date',
        align: 'left',
        type: 'Date',
        options: DateOptions,
    },
    {
        id: 'noOrderBy',
        label: 'Shipping Address',
        align: 'left',
        type: 'text',
        offOrder: true,
        offFilter: true,
    },
    { id: 'Total', label: 'Amount', align: 'left', type: 'number' },
    {
        id: 'Status',
        label: 'Status',
        align: 'left',
        type: 'Options',
        options: Options,
    },
    { id: 'action', label: 'Action', align: 'center', type: 'ignored' },
]

// =============================================================================
OrderList.getLayout = function getLayout(page: ReactElement) {
    return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}
// =============================================================================

export default function OrderList() {
    const [FilterByOptions, setFilterByOptions] = useState<FilterByOptions[]>(
        []
    )
    const { OrderLoader, onSearchOrders } = useOrderService()

    const fetchOrders = async () => {
        var OrderByOptions: OrderByOptions[] = []
        if (order && orderBy && orderBy != 'Quantity') {
            OrderByOptions = buildOrderBy(order, orderBy)
        }
        const _SQ: SearchQuery = {
            FilterByOptions: FilterByOptions,
            OrderByOptions: OrderByOptions,
            PageIndex: page,
            PageSize: rowsPerPage,
        }

        return (await onSearchOrders(_SQ)) as IOrderResponse
    }

    const {
        order,
        orderBy,
        selected,
        rowsPerPage,
        filteredList,
        handleChangePage,
        page,
        handleRequestSort,
    } = useMuiTable({
        listData: [],
        PerPage: 10,
        defaultOrder: 'desc',
        defaultSort: 'CreatedDate',
    })

    const handleSearch = (FilterByOptions: FilterByOptions[]) => {
        setFilterByOptions(FilterByOptions)
    }

    const {
        data: _response,
        refetch,
        isLoading,
    } = useQuery([], () => fetchOrders(), {
        refetchOnWindowFocus: false,
        keepPreviousData: true,
        enabled: true,
    })

    useEffect(() => {
        refetch()
    }, [page, order, orderBy, FilterByOptions])

    return (
        <Box py={4}>
            <H3 mb={2}>Orders</H3>
            <SearchBox handleSearch={handleSearch} searchList={tableHeading} />
            <Card>
                <Scrollbar>
                    <TableContainer sx={{ minWidth: 900 }}>
                        {(isLoading || OrderLoader) && (
                            <Box>
                                <LinearProgress color="info" />
                            </Box>
                        )}
                        <Table>
                            <TableHeader
                                order={order}
                                hideSelectBtn
                                orderBy={orderBy}
                                heading={tableHeading}
                                numSelected={selected.length}
                                rowCount={filteredList.length}
                                onRequestSort={handleRequestSort}
                            />

                            <TableBody>
                                {_response?.orderDetailsDto?.map(
                                    (order: TOrderDto) => (
                                        <OrderRow
                                            order={order}
                                            key={order.id}
                                        />
                                    )
                                )}
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
//   const orders = await api.orders();
//   return { props: { orders } };
// };
