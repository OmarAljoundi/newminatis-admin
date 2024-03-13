import { FC } from 'react'
import { KeyboardArrowDown } from '@mui/icons-material'
import {
    Box,
    Card,
    Grid,
    Button,
    Avatar,
    Divider,
    MenuItem,
    TextField,
    Chip,
} from '@mui/material'
import { format } from 'date-fns'
import { FlexBetween, FlexBox } from 'components/flex-box'
import { H3, H5, H6, Paragraph, Span } from 'components/Typography'
import { calculateOrderBeforeDiscount, currency } from 'lib'
import Order from 'models/order.model'
import { TOrderItemsDto } from 'types/TOrder'
import { MapColors } from 'helpers/Extensions'

// ===================================================================
type OrderDetailsProps = { order: TOrderItemsDto }
// ===================================================================

const OrderDetails: FC<OrderDetailsProps> = ({ order }) => {
    const totalBeforeDiscount = calculateOrderBeforeDiscount(order.items)
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Card sx={{ p: 3 }} elevation={6}>
                    <FlexBox
                        alignItems="center"
                        justifyContent={'space-between'}
                        gap={4}
                        mb={4}
                    >
                        <Box>
                            <Paragraph>
                                <Span color="grey.600">Order ID:</Span> #NM-
                                {11000 + order.orderId}
                            </Paragraph>

                            <Paragraph>
                                <Span color="grey.600">Placed on:</Span>{' '}
                                {format(
                                    new Date(order.createdDate),
                                    'dd MMM, yyyy'
                                )}
                            </Paragraph>
                        </Box>
                        <TextField
                            select
                            color="info"
                            size="small"
                            defaultValue={order.status}
                            label="Order Status"
                            inputProps={{
                                IconComponent: () => (
                                    <KeyboardArrowDown
                                        sx={{ color: 'grey.600', mr: 1 }}
                                    />
                                ),
                            }}
                        >
                            <MenuItem value="0">Processing</MenuItem>
                            <MenuItem value="1">UnderDelievery</MenuItem>
                            <MenuItem value="2">Delivered</MenuItem>
                            <MenuItem value="3">Cancelled</MenuItem>
                        </TextField>
                    </FlexBox>

                    {order.items.map((item, index) => (
                        <Box
                            my={2}
                            gap={2}
                            key={index}
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: {
                                    md: '1fr 1fr',
                                    xs: '1fr',
                                },
                            }}
                        >
                            <FlexBox
                                flexShrink={0}
                                gap={1.5}
                                alignItems="center"
                            >
                                <Avatar
                                    src={item.productImage}
                                    sx={{
                                        height: 64,
                                        width: 64,
                                        borderRadius: '8px',
                                    }}
                                />

                                <Box>
                                    <H6 mb={1}>{item.productName}</H6>

                                    <FlexBox alignItems="center" gap={1}>
                                        <Paragraph
                                            fontSize={14}
                                            color="grey.600"
                                        >
                                            {currency(item.pricePerOne)} x
                                        </Paragraph>

                                        <Box maxWidth={60}>
                                            <Chip label={item.quantity} />
                                        </Box>
                                    </FlexBox>
                                </Box>
                            </FlexBox>

                            <FlexBetween flexShrink={0}>
                                <Paragraph color="grey.600">
                                    Product properties: {MapColors(item.color)},{' '}
                                    {item.size}
                                </Paragraph>
                                <Paragraph color="grey.600">
                                    Product SKU: {item.sku}
                                </Paragraph>
                            </FlexBetween>
                        </Box>
                    ))}
                </Card>
            </Grid>

            <Grid item md={6} xs={12}>
                <Card sx={{ px: 3, py: 4, height: '100%' }} elevation={6}>
                    <H3 sx={{ mb: 2.5 }}>Address Information</H3>
                    <Paragraph
                        sx={{ whiteSpace: 'break-spaces', fontSize: '16px' }}
                    >
                        {order.shippingAddress.replaceAll('.', '\n')}
                    </Paragraph>
                </Card>
            </Grid>

            <Grid item md={6} xs={12}>
                <Card sx={{ px: 3, py: 4 }} elevation={6}>
                    <H5 mt={0} mb={2}>
                        Total Summary
                    </H5>

                    <FlexBetween mb={1.5}>
                        <Paragraph color="grey.600">Subtotal:</Paragraph>

                        <H6>{currency(totalBeforeDiscount)}</H6>
                    </FlexBetween>

                    <FlexBetween mb={1.5}>
                        <Paragraph color="grey.600">Shipping fee:</Paragraph>

                        <FlexBox alignItems="center" gap={1} maxWidth={100}>
                            FREE!
                        </FlexBox>
                    </FlexBetween>

                    <FlexBetween mb={1.5}>
                        <Paragraph color="grey.600">Discount($):</Paragraph>

                        <FlexBox alignItems="center" gap={1} maxWidth={100}>
                            <H6>
                                {order.subTotal
                                    ? `-${currency(
                                          totalBeforeDiscount - order.total
                                      )}`
                                    : 'No discount'}
                            </H6>
                        </FlexBox>
                    </FlexBetween>

                    <Divider sx={{ my: 2 }} />

                    <FlexBetween mb={2}>
                        <H6>Total</H6>
                        <H6>{currency(order.total)}</H6>
                    </FlexBetween>
                </Card>
            </Grid>
        </Grid>
    )
}

export default OrderDetails
