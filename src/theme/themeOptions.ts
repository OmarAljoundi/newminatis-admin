import { ThemeOptions } from '@mui/material/styles'
import { components } from './components'
import { blue, marron, paste, primary, themeColors } from './themeColors'
import { typography } from './typography'

const THEMES = {
    GIFT: 'GIFT',
    HEALTH: 'HEALTH',
    DEFAULT: 'DEFAULT',
    GROCERY: 'GROCERY',
    FURNITURE: 'FURNITURE',
}

const breakpoints = {
    values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
    },
}

/*
WE CREATED MULTIPLE THEME OPTIONS FOR DIFFERENT SHOP VARIATION.

YOU CAN JUST KEEP [THEMES.DEFAULT] AND REMOVE OTHER THEME OPTIONS.
*/

/*

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        width: 300,
    },
    indeterminateColor: {
        color: '#f50057',
    },
    selectAllText: {
        fontWeight: 500,
    },
    selectedAll: {
        backgroundColor: 'rgba(0, 0, 0, 0.08)',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.08)',
        },
    },
}))

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
    getContentAnchorEl: null,
    anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'center',
    },
    transformOrigin: {
        vertical: 'top',
        horizontal: 'center',
    },
    variant: 'menu',
}

const options = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
]

export { useStyles, MenuProps, options }
*/
const themesOptions: ThemeOptions = {
    [THEMES.DEFAULT]: {
        typography,
        breakpoints,
        components: { ...components },
        palette: {
            primary: { ...primary, light: primary[100] },
            ...themeColors,
        },
        PaperProps: {
            style: {
                maxHeight: 48 * 4.5 + 8,
                width: 250,
            },
        },
        getContentAnchorEl: null,
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
        },
        transformOrigin: {
            vertical: 'top',
            horizontal: 'center',
        },
        variant: 'menu',
        formControl: {
            width: 300,
        },
        indeterminateColor: {
            color: '#f50057',
        },
        selectAllText: {
            fontWeight: 500,
        },
        selectedAll: {
            backgroundColor: 'rgba(0, 0, 0, 0.08)',
            '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.08)',
            },
        },
    },
    [THEMES.GROCERY]: {
        typography,
        breakpoints,
        components: { ...components },
        palette: {
            primary: { ...primary, light: primary[100] },
            ...themeColors,
        },
    },
    [THEMES.FURNITURE]: {
        typography,
        breakpoints,
        components: { ...components },
        palette: { primary: { ...paste, light: paste[100] }, ...themeColors },
    },
    [THEMES.HEALTH]: {
        typography,
        breakpoints,
        components: { ...components },
        palette: { primary: { ...blue, light: blue[100] }, ...themeColors },
    },
    [THEMES.GIFT]: {
        typography,
        breakpoints,
        components: { ...components },
        palette: { primary: { ...marron, light: marron[100] }, ...themeColors },
    },
}

const themeOptions = (pathname: string) => {
    let themeOptions: ThemeOptions

    /*
    YOU CAN ALSO REMOVE updateTheme function
    AND FOLLOWING ENTIRE switch case BLOCK.
  */
    const updateTheme = (themeName: string) => {
        themeOptions = themesOptions[THEMES.DEFAULT]
    }

    switch (pathname) {
        case '/':
        case '/grocery1':
        case '/grocery2':
        case '/grocery3':
        case '/gadget-shop':
        case '/fashion-shop-1':
        case '/market-1':
            updateTheme(THEMES.DEFAULT)
            break

        case '/furniture-shop':
            updateTheme(THEMES.FURNITURE)
            break

        case '/healthbeauty-shop':
            updateTheme(THEMES.HEALTH)
            break

        case '/gift-shop':
            updateTheme(THEMES.GIFT)
            break

        default:
            themeOptions = themesOptions[THEMES.DEFAULT]
            break
    }
    /*
        IF YOU REMOVE THE switch case, YOU NEED TO ASSIGN VALUE TO themeOptions
        E.G. themeOptions = themesOptions[THEMES.DEFAULT];
    */
    // themeOptions = themesOptions[THEMES.DEFAULT];

    return themeOptions
}

export default themeOptions
