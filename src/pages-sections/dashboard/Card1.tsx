import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material'
import { Card } from '@mui/material'
import { FlexBetween, FlexBox } from 'components/flex-box'
import { H3, H6, Paragraph } from 'components/Typography'
import { Result, ResultYM } from 'interface/IOrderAnalyticsResponse'
import { currency } from 'lib'
import React, { FC } from 'react'

// ========================================================

// ========================================================

const Card1: FC<ResultYM> = (props) => {
    const { amount, color, title, total } = props

    return (
        <Card sx={{ p: 2 }}>
            <H6 mb={1} color="grey.600">
                {title}
            </H6>
            <H3 mb={0.3}>{total}</H3>
            <H3 mb={0.3}>{currency(amount)}</H3>
        </Card>
    )
}

// set default props for status and color
Card1.defaultProps = { color: 'info.main' }

export default Card1
