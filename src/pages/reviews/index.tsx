import { ReactElement, useEffect, useState } from 'react'
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
import ReviewRow from 'pages-sections/admin/reviews/ReviewRow'
import { TProductReview, TProductReviewDto } from 'types/TProductReview'
import useReviewService from 'hooks/useReviewService'
import { IProductReviewResponse } from 'interface/IProductReviewResponse'
import { SearchQuery } from 'types/TSearchQuery'

// TABLE HEADING DATA LIST
const tableHeading = [
    { id: 'id', label: 'Id', align: 'left' },
    { id: 'productName', label: 'Item', align: 'left' },
    { id: 'review', label: 'Comment', align: 'left' },
    { id: 'starts', label: 'Stars', align: 'left' },
    { id: 'status', label: 'Status', align: 'left' },
    {
        id: 'userEmail',
        label: 'User Email',
        align: 'left',
    },
    {
        id: 'createdDate',
        label: 'Review Date',
        align: 'left',
    },

    { id: 'action', label: 'Action', align: 'center' },
]

// =============================================================================
ReviewList.getLayout = function getLayout(page: ReactElement) {
    return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default function ReviewList() {
    const [reviews, setReviews] = useState<TProductReviewDto[]>([])
    const [total, setTotal] = useState<number>(0)
    const { ReviewLoader, onSearchReviews } = useReviewService()

    const fetchReviews = async () => {
        const _SQ: SearchQuery = {
            FilterByOptions: [],
            OrderByOptions: [],
            PageIndex: 0,
            PageSize: 0,
        }

        const result = (await onSearchReviews(_SQ)) as IProductReviewResponse
        if (result.success) {
            console.log('result.ProductReviewsDto', result.productReviewsDto)
            setReviews(result.productReviewsDto)
            setTotal(result.total)
        }
    }
    useEffect(() => {
        fetchReviews()
    }, [])

    const {
        order,
        orderBy,
        selected,
        rowsPerPage,
        filteredList,
        handleChangePage,
        handleRequestSort,
    } = useMuiTable({ listData: reviews })

    return (
        <Box py={4}>
            <H3 mb={2}>Reviews List</H3>

            <SearchArea
                handleSearch={() => {}}
                buttonText=""
                handleBtnClick={() => {}}
                searchPlaceholder="Search Review..."
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
                                rowCount={total}
                                numSelected={selected.length}
                                onRequestSort={handleRequestSort}
                            />

                            <TableBody>
                                {filteredList.map((review, index) => (
                                    <ReviewRow
                                        productReview={review}
                                        handleDeleteReview={() => {}}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>

                <Stack alignItems="center" my={4}>
                    <TablePagination
                        onChange={handleChangePage}
                        count={Math.ceil(total / rowsPerPage)}
                    />
                </Stack>
            </Card>
        </Box>
    )
}
