import { createRef, FC, ReactNode } from 'react'

import { merge } from 'merge'
import { CssBaseline } from '@mui/material'
import {
    createTheme,
    responsiveFontSizes,
    ThemeProvider,
} from '@mui/material/styles'

import customThemeOptions from './themeOptions'
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar'
// =======================================================
type MuiThemeProps = { children?: ReactNode }
// =======================================================
export const ref = createRef<LoadingBarRef>()
const MuiTheme: FC<MuiThemeProps> = ({ children }) => {
    const themeOptions = customThemeOptions('/')
    let theme = createTheme(merge({}, { ...themeOptions, direction: 'ltr' }))
    theme = responsiveFontSizes(theme)

    // theme shadows
    theme.shadows[1] = '0px 1px 3px rgba(3, 0, 71, 0.09)'
    theme.shadows[2] = '0px 4px 16px rgba(43, 52, 69, 0.1)'
    theme.shadows[3] = '0px 8px 45px rgba(3, 0, 71, 0.09)'
    theme.shadows[4] = '0px 0px 28px rgba(3, 0, 71, 0.01)'

    return (
        <ThemeProvider theme={theme}>
            <LoadingBar ref={ref} color="red" />
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}

export default MuiTheme
