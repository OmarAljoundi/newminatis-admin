import { FC, lazy, useEffect, useState } from 'react'
import { KeyboardArrowDown } from '@mui/icons-material'
import {
    Box,
    Card,
    MenuItem,
    Select,
    SelectChangeEvent,
    styled,
    useTheme,
} from '@mui/material'
import { H5 } from 'components/Typography'
import { FlexBetween } from 'components/flex-box'
import { analyticsChartOptions } from './chartsOptions'
import { AxiosResponse } from 'axios'
import { IProductResponse } from 'interface/IProductResponse'
import AnalyticsService from 'service/AnalyticsService'
import { TAnalyticsOrder } from 'types/TAnalytics'
import {
    IOrderAnalyticsResponse,
    Result,
} from 'interface/IOrderAnalyticsResponse'

// apext chart instance
const ReactApexChart = lazy(() => import('react-apexcharts'))

// styled component
const StyledSelect = styled(Select)(({ theme }) => ({
    fontSize: 14,
    fontWeight: 500,
    color: theme.palette.grey[600],
    '& fieldset': { border: '0 !important' },
    '& .MuiSelect-select': { padding: 0, paddingRight: '8px !important' },
}))

const Analytics: FC<{ analytics: Result[] }> = ({ analytics }) => {
    const theme = useTheme()

    const [selectType, setSelectType] = useState('yearly')

    return (
        <Box>
            {analytics?.map((x) => (
                <Card sx={{ p: 3, mt: 4 }} key={x.title} elevation={6}>
                    <FlexBetween>
                        <H5>{x.title}</H5>

                        {/* <StyledSelect
                            value={selectType}
                            IconComponent={() => <KeyboardArrowDown />}
                            onChange={(e: SelectChangeEvent<string>) =>
                                setSelectType(e.target.value)
                            }
                        >
                            <MenuItem value="yearly">Yearly</MenuItem>
                            <MenuItem value="monthly">Monthly</MenuItem>
                            <MenuItem value="Weekily">Weekily</MenuItem>
                        </StyledSelect> */}
                    </FlexBetween>

                    <ReactApexChart
                        type="bar"
                        height={300}
                        series={[
                            {
                                name: 'SOLD',
                                data: x.nameVsCount.map((m) => m.count),
                            },
                        ]}
                        options={analyticsChartOptions(
                            theme,
                            x.nameVsCount.map((m) => m.name)
                        )}
                    />
                </Card>
            ))}
        </Box>
    )
}

export default Analytics
