import { FileType } from 'pages-sections/site-settings/BannerSlider'

export type TProductImages = {
    id: number
    productId: number
    imageUrl: string
    imageOrder: number
    file: FileType | null
}
