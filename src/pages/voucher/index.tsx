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
import { useLoaderData, useNavigate } from 'react-router-dom'
import { IVoucherResponse } from 'interface/IVoucherResponse'
import VoucherRow from 'pages-sections/admin/vouchers/VoucherRow'
import useVoucherService from 'hooks/useVoucherService'
import { notifySuccess } from 'service/toasterService'

// TABLE HEADING DATA LIST
const tableHeading = [
    { id: 'id', label: 'Id', align: 'left' },
    { id: 'code', label: 'Code', align: 'left' },
    { id: 'type', label: 'Type', align: 'left' },
    { id: 'amount', label: 'Amount', align: 'left' },

    {
        id: 'limitedUsedPerCoupon',
        label: 'Limited Per Coupon',
        align: 'left',
    },
    {
        id: 'limitedUsedPerUser',
        label: 'Limited Per User',
        align: 'left',
    },
    {
        id: 'used',
        label: 'Used',
        align: 'left',
    },
    {
        id: 'expired',
        label: 'Expired Date',
        align: 'left',
    },
    {
        id: 'createdDate',
        label: 'Created Date',
        align: 'left',
    },
    { id: 'active', label: 'Published', align: 'left' },
    { id: 'action', label: 'Action', align: 'center' },
]

// =============================================================================
VoucherList.getLayout = function getLayout(page: ReactElement) {
    return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default function VoucherList() {
    const data = useLoaderData() as IVoucherResponse
    const route = useNavigate()
    const { onDeleteVoucher } = useVoucherService()
    const [deletedVouchers, setDeletedVouchers] = useState<number[]>([])

    // RESHAPE THE PRODUCT LIST BASED TABLE HEAD CELL ID
    const filterVouchers = data.vouchers?.map((item) => ({
        id: item.id,
        code: item.code,
        type: item.type,
        amount: item.amount,
        active: item.active,
        limitedUsedPerCoupon: item.limitedUsedPerCoupon,
        limitedUsedPerUser: item.limitedUsedPerUser,
        used: item.orderDetails.length,
        expired: item.expired,
        createdDate: item.createdDate,
    }))

    const {
        order,
        orderBy,
        selected,
        rowsPerPage,
        filteredList,
        handleChangePage,
        handleRequestSort,
    } = useMuiTable({ listData: filterVouchers })

    const handleButtonClick = () => {
        route('/vouchers')
    }
    const handleDeleteVoucher = async (id: number) => {
        const result = (await onDeleteVoucher(id)) as IVoucherResponse
        if (result.success) {
            notifySuccess('Voucher Deleted Successfully!')
            setDeletedVouchers((e) => [...e, id])
        }
    }

    return (
        <Box py={4}>
            <H3 mb={2}>Voucher List</H3>

            <SearchArea
                handleSearch={() => {}}
                buttonText="Add Voucher"
                handleBtnClick={() => {
                    handleButtonClick()
                }}
                searchPlaceholder="Search Voucher..."
            />

            <Card>
                <Scrollbar autoHide={false}>
                    <TableContainer sx={{ minWidth: 900 }}>
                        <Table>
                            <TableHeader
                                order={order}
                                hideSelectBtn
                                orderBy={orderBy}
                                heading={tableHeading}
                                rowCount={data.vouchers?.length ?? 0}
                                numSelected={selected.length}
                                onRequestSort={handleRequestSort}
                            />

                            <TableBody>
                                {filteredList
                                    .filter(
                                        (x) => !deletedVouchers.includes(x.id)
                                    )
                                    .map((voucher, index) => (
                                        <VoucherRow
                                            voucher={voucher}
                                            key={index}
                                            handleDeleteVoucher={
                                                handleDeleteVoucher
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
                        count={Math.ceil(
                            (data.vouchers?.length ?? 10) / rowsPerPage
                        )}
                    />
                </Stack>
            </Card>
        </Box>
    )
}
