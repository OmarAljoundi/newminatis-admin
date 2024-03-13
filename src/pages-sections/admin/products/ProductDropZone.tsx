import { FC, useCallback, useEffect, useState } from 'react'
import { Button, Card, Grid } from '@mui/material'
import update from 'immutability-helper'
import { useFormik } from 'formik'
import DropZone from 'components/DropZone'
import { TProduct, _colorsOptions } from 'types/TProduct'
import { TProductImages } from 'types/TProductImages'
import { FileType } from 'pages-sections/site-settings/BannerSlider'
import { ProductCard } from './ProductCard'

// ================================================================
type ProductFormProps = {
    initialValues: TProduct
    handleFormSubmit: (values: TProduct) => void
    initalFiles: FileType[]
}

// ================================================================

const ProductDropZone: FC<ProductFormProps> = (props) => {
    const { initialValues, handleFormSubmit, initalFiles } = props
    const [cards, setCards] = useState<FileType[] | null>([])

    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        onSubmit: handleFormSubmit,
    })

    const handleChangeDropZone = (files: File[]) => {
        var init: TProductImages[] = []
        var _cards = cards
        files.forEach((file) => {
            var x: TProductImages = {
                id: 0,
                file: Object.assign(file, {
                    preview: URL.createObjectURL(file),
                }),
                imageOrder: 0,
                productId: initialValues.id,
                imageUrl: '',
            }
            init.push(x)
            _cards.push(x.file)
        })

        setCards(_cards)
        formik.setValues({
            ...formik.values,
            ['productImages']: [...formik.values.productImages, ...init],
        })
    }

    const handleFileDelete = (file: FileType) => {
        debugger
        const files = formik.values.productImages.filter(
            (item) => item.file !== file
        )
        formik.values.productImages = files
        setCards(files.map((x) => x.file))
    }

    useEffect(() => {
        if (
            initalFiles &&
            initalFiles.length > 0 &&
            initialValues.productImages &&
            initialValues.productImages.length > 0
        ) {
            var ProductImage = initialValues.productImages
            initalFiles.map((i, index) => {
                ProductImage[index].file = i
            })

            setCards(ProductImage.map((i) => i.file))
            formik.setValues({
                ...formik.values,
                ['productImages']: ProductImage,
            })
        }
    }, [initalFiles])

    useEffect(() => {
        var ProductImages: TProductImages[] = []
        cards.forEach((item, index) => {
            ProductImages.push({
                file: item,
                id: 0,
                imageOrder: index,
                imageUrl: '',
                productId: initialValues.id,
            })
        })

        formik.setValues({
            ...formik.values,
            ['productImages']: ProductImages,
        })
    }, [cards])

    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
        setCards((prevCards: FileType[]) =>
            update(prevCards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevCards[dragIndex] as FileType],
                ],
            })
        )
    }, [])

    const renderCard = useCallback((card: FileType, index: number) => {
        return (
            <Grid item xs={2}>
                <ProductCard
                    file={card}
                    key={index}
                    index={index}
                    id={card.name}
                    moveCard={moveCard}
                    handleFileDelete={handleFileDelete}
                />
            </Grid>
        )
    }, [])

    return (
        <Card sx={{ p: 6, mb: 6 }}>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <DropZone
                            onChange={(files) => handleChangeDropZone(files)}
                        />

                        <Grid container spacing={3} mt={2}>
                            {cards?.map((card, i) => renderCard(card, i))}
                        </Grid>
                    </Grid>

                    <Grid item sm={6} xs={12} mt={5}>
                        <Button variant="contained" color="info" type="submit">
                            Save Images
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Card>
    )
}

export default ProductDropZone
