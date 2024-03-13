import { FC, useCallback, useEffect, useState } from 'react'
import { Card, Grid } from '@mui/material'
import { useFormik } from 'formik'
import update from 'immutability-helper'
import { TProduct, _colorsOptions } from 'types/TProduct'
import { ProductCard } from './ProductCard'

// ================================================================
type ProductFormProps = {
    initialValues: TProduct
    handleFormSubmit: (values: TProduct) => void
    products?: TProduct[]
}

// ================================================================
const style = {
    width: '100%',
}
const RelatedProducts: FC<ProductFormProps> = (props) => {
    const { initialValues, handleFormSubmit } = props
    const [cards, setCards] = useState<string[] | null>(
        initialValues?.relatedProducts?.split(',')
    )
    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        onSubmit: handleFormSubmit,
        validateOnBlur: false,
        validateOnChange: false,
    })

    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
        setCards((prevCards: string[]) =>
            update(prevCards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevCards[dragIndex] as string],
                ],
            })
        )
    }, [])

    const renderCard = useCallback((card: string, index: number) => {
        return (
            <Grid item xs={3}>
                {/* <ProductCard
                    
                    key={card}
                    index={index}
                    id={card}
                   
                    moveCard={moveCard}
                /> */}
            </Grid>
        )
    }, [])

    return (
        <Card sx={{ p: 6 }}>
            <form onSubmit={formik.handleSubmit}>
                <div style={style}>
                    <Grid container spacing={3} mt={2}>
                        {cards?.map((card, i) => renderCard(card, i))}
                    </Grid>
                </div>
            </form>
        </Card>
    )
}

export default RelatedProducts
