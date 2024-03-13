import { FC } from 'react'
import { Box, Card } from '@mui/material'
import { H3, H5, Paragraph } from 'components/Typography'
import { currency } from 'lib'

const WishCard: FC<{ totalTodaySale: number }> = ({ totalTodaySale }) => {
    return (
        <Card
            sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                position: 'relative',
                flexDirection: 'column',
                justifyContent: 'center',
            }}
        >
            <Paragraph color="grey.600">
                Here’s what happening with your store today!
            </Paragraph>

            <H3 mt={1.5}>{currency(totalTodaySale)}</H3>
            <Paragraph color="grey.600">Today’s total sales</Paragraph>
        </Card>
    )
}

export default WishCard
