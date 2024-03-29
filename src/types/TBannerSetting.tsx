import { FileType } from 'pages-sections/site-settings/BannerSlider'

export type TBannerSetting = {
    id: number
    banner: string | null
    text: string | null
    action: string | null
    actionUrl: string | null
    createdDate: Date | null
    file: FileType | null
}
