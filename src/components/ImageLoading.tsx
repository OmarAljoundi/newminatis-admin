import { Box, Button } from '@mui/material'
import { DetailedHTMLProps, FC, ImgHTMLAttributes, useState } from 'react'

export const ImageLoading: FC<
    DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
> = (props) => {
    const [imageLoaded, setImageLoaded] = useState(false)
    return (
        <Box position={'relative'}>
            <img
                {...props}
                onLoad={() => setImageLoaded(true)}
                alt=""
                role={'presentation'}
                decoding="async"
                width={'100%'}
                className={`image smooth-image image-${
                    imageLoaded ? 'visible' : 'hidden'
                }`}
            />
        </Box>
    )
}
