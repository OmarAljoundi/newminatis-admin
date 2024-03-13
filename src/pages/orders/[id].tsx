import { ReactElement, useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { H3 } from 'components/Typography'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import { OrderDetails } from 'pages-sections/admin'
import { TOrderItemsDto } from 'types/TOrder'
import { IOrderResponse } from 'interface/IOrderResponse'
import { useLoaderData } from 'react-router-dom'

// =============================================================================
OrderView.getLayout = function getLayout(page: ReactElement) {
    return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}
// =============================================================================

export default function OrderView() {
    const [INITIAL_VALUES] = useState<TOrderItemsDto>(
        (useLoaderData() as IOrderResponse).orderItemsDto
    )

    if (!INITIAL_VALUES) {
        return <h1>Loading...</h1>
    }

    return (
        <Box py={4}>
            <H3 mb={2}>Order Details</H3>
            <OrderDetails order={INITIAL_VALUES} />
        </Box>
    )
}
