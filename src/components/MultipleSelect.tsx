import {
    Box,
    Chip,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    Theme,
    useTheme,
} from '@mui/material'
import { FC, useEffect, useState } from 'react'

type MultipleSelectProp = {
    label: string
    list: any[]
    formik: any
}

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
}

function getStyles(name: string, personName: readonly string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    }
}

export const MultipleSelect: FC<MultipleSelectProp> = ({
    label,
    list,
    formik,
}) => {
    const theme = useTheme()
    const [values, setValues] = useState<string[]>([])

    useEffect(() => {
        formik?.setFieldValue('users', values.join(','))
    }, [values])
    return (
        <FormControl sx={{ width: '100%' }}>
            <InputLabel
                id="demo-multiple-chip-label"
                sx={{
                    top: '-7px',
                    '&.Mui-focused': {
                        top: '0',
                    },
                }}
            >
                {label}
            </InputLabel>
            <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                label="Variables"
                fullWidth
                size="small"
                multiple
                value={values}
                onChange={(e) => setValues([...e.target.value])}
                input={
                    <OutlinedInput label="Variables" fullWidth size="small" />
                }
                renderValue={(selected) => (
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 0.5,
                        }}
                    >
                        {selected.map((value) => (
                            <Chip
                                key={value}
                                label={value}
                                sx={{
                                    height: '20px',
                                }}
                            />
                        ))}
                    </Box>
                )}
                MenuProps={MenuProps}
            >
                {list.map((i) => (
                    <MenuItem
                        key={i.email}
                        value={i.name}
                        style={getStyles(i.email, values, theme)}
                    >
                        {i.email}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}
