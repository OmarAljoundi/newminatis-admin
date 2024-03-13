import { Button, ButtonProps, CircularProgress } from '@mui/material'
import { FC } from 'react'

type OtherProps = {
    loading: boolean
    content: string
}

export const LoadingButton: FC<ButtonProps & OtherProps> = ({
    loading,
    content,
    ...props
}) => {
    return (
        <Button variant="contained" disabled={loading} {...props}>
            {loading && (
                <CircularProgress
                    sx={{ width: '24px!important', height: '24px!important' }}
                />
            )}
            {!loading && content}
        </Button>
    )
}
