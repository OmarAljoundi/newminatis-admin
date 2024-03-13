import { ReactElement, useEffect, useState } from 'react'
import { Box, Grid } from '@mui/material'
import Card1 from 'pages-sections/dashboard/Card1'
import Section3 from 'pages-sections/dashboard/Section3'
import WishCard from 'pages-sections/dashboard/WishCard'
import Analytics from 'pages-sections/dashboard/Analytics'
import RecentPurchase from 'pages-sections/dashboard/RecentPurchase'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import AnalyticsService from 'service/AnalyticsService'
import { AxiosResponse } from 'axios'
import { IOrderAnalyticsResponse } from 'interface/IOrderAnalyticsResponse'

// =============================================================================
VendorDashboard.getLayout = function getLayout(page: ReactElement) {
    return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}

export default function VendorDashboard() {
    const [analytics, setAnalytics] = useState<IOrderAnalyticsResponse>()

    const getAll = async () => {
        const result =
            (await AnalyticsService.orders()) as AxiosResponse<IOrderAnalyticsResponse>
        if (result.status == 200) {
            setAnalytics(result.data)
        }
    }

    useEffect(() => {
        getAll()
    }, [])

    return (
        <Box py={4}>
            <Grid container spacing={3}>
                {/* WISHING CARD */}
                <Grid item md={6} xs={12}>
                    <WishCard totalTodaySale={analytics?.totalTodaySale} />
                </Grid>

                {/* ALL TRACKING CARDS */}
                <Grid container item md={6} xs={12} spacing={3}>
                    {analytics?.resultYM.map((item) => (
                        <Grid item md={6} sm={6} xs={12} key={item?.title}>
                            <Card1
                                title={item.title}
                                color={item.color}
                                amount={item.amount}
                                total={item.total}
                            />
                        </Grid>
                    ))}
                </Grid>

                {/* SALES AREA */}
                <Grid item xs={12}>
                    <Section3 analytics={analytics?.resultPlace} />
                </Grid>

                {/* ANALYTICS AREA */}
                <Grid item xs={12}>
                    <Analytics analytics={analytics?.result} />
                </Grid>

                {/* RECENT PURCHASE AREA */}
                {/* <Grid item md={7} xs={12}>
                    <RecentPurchase data={recentPurchase} />
                </Grid> */}

                {/* STOCK OUT PRODUCTS */}
                {/* <Grid item md={5} xs={12}>
                    <StockOutProducts data={stockOutProducts} />
                </Grid> */}
            </Grid>
        </Box>
    )
}

// export const getStaticProps: GetStaticProps = async () => {
//     const cardList = await api.getAllCard()
//     const recentPurchase = await api.recentPurchase()
//     const stockOutProducts = await api.stockOutProducts()
//     return { props: { cardList, recentPurchase, stockOutProducts } }
// }
