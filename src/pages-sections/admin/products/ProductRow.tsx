import React, { FC, useEffect, useState } from 'react'
import { Delete, Edit } from '@mui/icons-material'
import {
    Box,
    CircularProgress,
    Grid,
    IconButton,
    TextField,
    Tooltip,
    tooltipClasses,
    TooltipProps,
    Typography,
} from '@mui/material'
import BazaarSwitch from 'components/BazaarSwitch'
import { currency } from 'lib'
import {
    StyledTableRow,
    CategoryWrapper,
    StyledTableCell,
    StyledIconButton,
} from '../StyledComponents'
import { Link } from 'react-router-dom'
import { TProduct, ValueVsQuantity } from 'types/TProduct'
import SaveIcon from '@mui/icons-material/Save'
import useProductService from 'hooks/useProductService'
import { IProductResponse } from 'interface/IProductResponse'
import { useSnackbar } from 'notistack'
import ProductService from 'service/ProductService'
import styled from '@emotion/styled'
import { FlexBetween } from 'components/flex-box'
// ========================================================================
type ProductRowProps = { product: TProduct }
// ========================================================================
const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#2b3445',
        color: 'white',
        maxWidth: '300px',
        fontSize: '12px',
        border: '1px solid #dadde9',
    },
}))

const ProductRow: FC<ProductRowProps> = ({ product }) => {
    const {
        productCategory,
        friendlyName,
        price,
        id,
        status,
        priority,
        salePrice,
        subSku,
    } = product

    const { onCreateProduct, CreateLoad } = useProductService()
    const [disable, setDisable] = useState<boolean>(true)
    const [_priority, setPriority] = useState<number>(0)
    const { enqueueSnackbar } = useSnackbar()
    const [loadStock, setLoadStock] = useState(false)
    const [valueVsQuantity, setValueVsQuantity] = useState<ValueVsQuantity[]>(
        []
    )
    const handleUpdateItem = async () => {
        var _product = { ...product }
        _product.priority = _priority
        const result = (await onCreateProduct(_product)) as IProductResponse
        if (result.success) {
            enqueueSnackbar('Product Saved')
            setDisable(true)
        } else {
            enqueueSnackbar(result.message)
        }
    }

    useEffect(() => {
        setPriority(priority)
        setLoadStock(true)
        executeAllLongRunningTasks().then((res) => {
            setValueVsQuantity(res as ValueVsQuantity[])
            setLoadStock(false)
        })
    }, [product])

    const executeLongRunningtask = async (value: string) => {
        return new Promise((resolve, reject) => {
            var stock: ValueVsQuantity = {
                quantity: 0,
                variable: value,
            }
            ProductService.getQuantity({
                inventory_type: 'domestic',
                sku: value,
            }).then((x) => {
                if (
                    x.data.status.response == true &&
                    x.data.inventory.quantity != '0'
                ) {
                    stock.quantity = x.data.inventory
                        .quantity as unknown as number
                }
                resolve(stock)
            })
        })
    }
    const executeAllLongRunningTasks = async () => {
        var x = (subSku as string) ?? ''
        return await Promise.all(x.split(',')?.map(executeLongRunningtask))
    }

    return (
        <StyledTableRow tabIndex={-1} role="checkbox">
            <StyledTableCell align="left">#{id}</StyledTableCell>

            <StyledTableCell align="left">{friendlyName}</StyledTableCell>

            <StyledTableCell align="left">
                <CategoryWrapper>{productCategory?.name}</CategoryWrapper>
            </StyledTableCell>

            <StyledTableCell align="left">
                <HtmlTooltip
                    placement="right"
                    title={
                        <React.Fragment>
                            <Typography color="inherit">
                                Stock Details
                            </Typography>
                            <Box>
                                {valueVsQuantity.map((i) => (
                                    <FlexBetween>
                                        <Box>{i.variable.split('-')[3]}</Box>

                                        <Box>{i.quantity}</Box>
                                    </FlexBetween>
                                ))}
                            </Box>
                        </React.Fragment>
                    }
                >
                    <CategoryWrapper>
                        {loadStock ? (
                            <CircularProgress color="inherit" size={15} />
                        ) : (
                            valueVsQuantity.reduce(
                                (sum, current) =>
                                    Number(sum) + Number(current.quantity),
                                0
                            )
                        )}
                    </CategoryWrapper>
                </HtmlTooltip>
            </StyledTableCell>

            <StyledTableCell align="left">{currency(price)}</StyledTableCell>

            <StyledTableCell align="left">
                {salePrice > 0 && (
                    <CategoryWrapper>%{salePrice}</CategoryWrapper>
                )}
            </StyledTableCell>

            <StyledTableCell align="left">
                <TextField
                    type="number"
                    variant="outlined"
                    color="info"
                    value={_priority}
                    onChange={(x) => {
                        setPriority(x.target.value as unknown as number)
                        setDisable(false)
                    }}
                    InputProps={{
                        endAdornment: (
                            <Tooltip
                                title="click to save"
                                open={!disable}
                                placement="top"
                                arrow={true}
                            >
                                <IconButton
                                    onClick={handleUpdateItem}
                                    disabled={disable}
                                    sx={{ color: '#4e97fd' }}
                                >
                                    <SaveIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        ),
                    }}
                />
            </StyledTableCell>

            <StyledTableCell align="left">
                <BazaarSwitch color="info" checked={status} disabled />
            </StyledTableCell>

            <StyledTableCell align="center">
                <Link to={`/product/${id}`}>
                    <StyledIconButton>
                        <Edit />
                    </StyledIconButton>
                </Link>

                <StyledIconButton>
                    <Delete />
                </StyledIconButton>
            </StyledTableCell>
        </StyledTableRow>
    )
}

export default ProductRow
