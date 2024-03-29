import { FC, ReactNode, useEffect } from 'react'
import { Box, styled } from '@mui/material'
import { Fragment, useState } from 'react'
import DashboardNavbar from './DashboardNavbar'
import DashboardSidebar from './DashboardSidebar'
import { useLocation, useNavigate } from 'react-router-dom'
import UserService from 'service/UserService'
import Cookies from 'js-cookie'
import { AxiosResponse } from 'axios'
import { IBaseResponse } from 'interface/IBaseResponse'

// styled components
const BodyWrapper = styled(Box)<{ compact: number }>(({ theme, compact }) => ({
    transition: 'margin-left 0.3s',
    marginLeft: compact ? '86px' : '280px',
    [theme.breakpoints.down('lg')]: { marginLeft: 0 },
}))

const InnerWrapper = styled(Box)(({ theme }) => ({
    transition: 'all 0.3s',
    [theme.breakpoints.up('lg')]: { maxWidth: 1200, margin: 'auto' },
    [theme.breakpoints.down(1550)]: {
        paddingLeft: '2rem',
        paddingRight: '2rem',
    },
}))

// ======================================================
type Props = { children: ReactNode }
// ======================================================

const VendorDashboardLayout: FC<Props> = ({ children }) => {
    const [sidebarCompact, setSidebarCompact] = useState(0)
    const [showMobileSideBar, setShowMobileSideBar] = useState(0)
    const { pathname } = useLocation()
    const route = useNavigate()
    // handle sidebar toggle for desktop device
    const handleCompactToggle = () =>
        setSidebarCompact((state) => (state ? 0 : 1))
    // handle sidebar toggle in mobile device
    const handleMobileDrawerToggle = () =>
        setShowMobileSideBar((state) => (state ? 0 : 1))

    return (
        <Fragment>
            <DashboardSidebar
                sidebarCompact={sidebarCompact}
                showMobileSideBar={showMobileSideBar}
                setSidebarCompact={handleCompactToggle}
                setShowMobileSideBar={handleMobileDrawerToggle}
            />

            <BodyWrapper compact={sidebarCompact ? 1 : 0}>
                <DashboardNavbar
                    handleDrawerToggle={handleMobileDrawerToggle}
                />
                <InnerWrapper>{children}</InnerWrapper>
            </BodyWrapper>
        </Fragment>
    )
}

export default VendorDashboardLayout
