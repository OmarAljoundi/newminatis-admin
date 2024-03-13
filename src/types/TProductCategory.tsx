import { FileType } from 'pages-sections/site-settings/BannerSlider'
import { TProductSubCategory } from './TProductSubCategory'

export type TProductCategory = {
    id: number
    name: string
    description: string
    createdDate: Date | null
    modifiedDate: Date | null
    seoTitle: string | null
    seoDescription: string | null
    seoTags: string | null
    productSubCategory: TProductSubCategory[]
    imageUrl?: string | null
    file?: FileType
}
