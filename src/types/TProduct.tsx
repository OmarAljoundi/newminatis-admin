import { TProductCategory } from './TProductCategory'
import { TProductImages } from './TProductImages'
import { TProductSizeGuide } from './TProductSizeGuide'

export type TProduct = {
    id: number
    name: string
    friendlyName: string
    color: eColor | null
    instock?: boolean | null
    status: boolean
    description: string
    shortDescription: string
    sku: string
    subSku: string | string[]
    sizes: string | string[]
    tags: string | string[]
    categoryId: number | null
    isBestSeller: number | null
    price: number
    salePrice: number | null
    discountId: number
    createdDate: Date | null
    ModifiedDate: Date | null
    productCategory: TProductCategory | null
    files: File[] | null
    productImages?: TProductImages[] | null
    productSizeGuide?: TProductSizeGuide[] | null
    relatedProducts?: string | null
    mainImage: string
    priority: number
    seoTitle?: string | null
    seoDescription?: string | null
    seoTags?: string | null
    type?: string
    subCategory: string | string[]
}

export enum eColor {
    Black = 1,
    Gray = 2,
    White = 3,
    Beige = 4,
}

export type colorsOptions = {
    label: string
    value: eColor
}

export const _colorsOptions: colorsOptions[] = [
    {
        label: 'Black',
        value: eColor.Black,
    },
    {
        label: 'Gray',
        value: eColor.Gray,
    },
    {
        label: 'White',
        value: eColor.White,
    },
    {
        label: 'Beige',
        value: eColor.Beige,
    },
]

export type UpdateSaleRequest = {
    products: TProduct[]
    percent: number
}

export type ValueVsQuantity = {
    variable: string
    quantity: number
}
