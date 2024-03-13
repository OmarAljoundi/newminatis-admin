import { ReactElement } from 'react'
import { Box } from '@mui/material'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import { H3 } from 'components/Typography'

ArticlesList.getLayout = function getLayout(page: ReactElement) {
    return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default function ArticlesList() {
    return (
        <Box py={4}>
            <H3 mb={2}>Articles List</H3>
        </Box>
    )
}
