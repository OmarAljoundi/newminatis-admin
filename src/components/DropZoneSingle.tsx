import { FC, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Box, Button, Divider } from '@mui/material'
import { H5, Small } from './Typography'

// ========================================================
type DropZoneProps = {
    title?: string
    imageSize?: string
    onChange: (files: File) => void
}
// ========================================================

const DropZoneSingle: FC<DropZoneProps> = ({
    onChange,
    title = 'Drag & drop product image here',
    imageSize = 'Upload 280*280 image',
}) => {
    const onDrop = useCallback(
        (acceptedFiles: File[]) => onChange(acceptedFiles[0]),
        [onChange]
    )

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
        accept: { 'image/*': ['.png', '.gif', '.jpeg', '.jpg'] },
    })

    return (
        <Box
            py={4}
            px={{ md: 10, xs: 4 }}
            display="flex"
            minHeight="200px"
            alignItems="center"
            borderRadius="10px"
            border="1.5px dashed"
            flexDirection="column"
            borderColor="grey.300"
            justifyContent="center"
            textAlign="center"
            bgcolor={isDragActive ? 'grey.200' : 'grey.100'}
            sx={{ transition: 'all 250ms ease-in-out', outline: 'none' }}
            {...getRootProps()}
        >
            <input {...getInputProps()} />
            <H5 mb={1} color="grey.600">
                {title}
            </H5>

            <Divider
                sx={{
                    '::before, ::after': { borderColor: 'grey.300', width: 70 },
                }}
            >
                <Small color="text.disabled" px={1}>
                    OR
                </Small>
            </Divider>

            <Button
                type="button"
                variant="outlined"
                color="info"
                sx={{ px: 4, my: 4 }}
            >
                Select file
            </Button>

            <Small color="grey.600">{imageSize}</Small>
        </Box>
    )
}

export default DropZoneSingle
