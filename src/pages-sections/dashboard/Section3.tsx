import { FC, lazy } from 'react'
import { Box, Grid, useTheme } from '@mui/material'
import Card2 from './Card2'
import * as options from './chartsOptions'
import { currency } from 'lib'
import { Result } from 'interface/IOrderAnalyticsResponse'

// apext chart instance
const ReactApexChart = lazy(() => import('react-apexcharts'))

const Section3: FC<{ analytics: Result[] }> = ({ analytics }) => {
    const theme = useTheme()

    return (
        <Box>
            <Grid container spacing={3}>
                {analytics?.map((x) => (
                    <Grid item xl={6} lg={6} md={6} xs={12} key={x.title}>
                        <Card2 title={x.title}>
                            <ReactApexChart
                                height={180}
                                type="donut"
                                width={380}
                                series={x.nameVsCount.map((m) => m.count)}
                                options={options.dountChartOptions(
                                    theme,
                                    x.nameVsCount.map((m) => m.name),
                                    x.nameVsCount.map((m) => m.count)
                                )}
                            />
                        </Card2>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default Section3
