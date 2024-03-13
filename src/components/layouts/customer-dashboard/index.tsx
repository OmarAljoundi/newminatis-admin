import { FC, ReactNode } from 'react'
import { Container, Grid } from '@mui/material'
import Navigations from './Navigations'

/**
 *  Used in:
 *  1. wish-list page
 *  2. address and address-details page
 *  3. orders and order-details page
 *  4. payment-methods and payment-method-details page
 *  5. profile and edit profile page
 *  6. support-tickets page
 */
// ======================================================
type Props = { children: ReactNode }
// ======================================================

const CustomerDashboardLayout: FC<Props> = ({ children }) => (
    <Container sx={{ my: '2rem' }}>
        <Grid container spacing={3}>
            <Grid
                item
                lg={3}
                xs={12}
                sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}
            >
                <Navigations />
            </Grid>

            <Grid item lg={9} xs={12}>
                {children}
            </Grid>
        </Grid>
    </Container>
)

export default CustomerDashboardLayout
