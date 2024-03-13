import { FC, ReactNode } from 'react'
import { Box, Card } from '@mui/material'
import { ArrowDropUp } from '@mui/icons-material'
import { FlexBox } from 'components/flex-box'
import { H3, H6, Paragraph } from 'components/Typography'

// =========================================================
type Card2Props = {
    title: string
    children: ReactNode
}
// =========================================================

const Card2: FC<Card2Props> = ({ children, title }) => {
    return (
        <Card
            sx={{
                p: 3,
                pr: 1,
                gap: 2,
                height: '100%',
            }}
            elevation={6}
        >
            <H6 color="grey.600">{title}</H6>
            <Box sx={{ '& > div': { minHeight: '0px !important' } }}>
                {children}
            </Box>
        </Card>
    )
}

export default Card2
