import { Backdrop } from '@mui/material'
import { AxiosResponse } from 'axios'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import { IBaseResponse } from 'interface/IBaseResponse'
import { Suspense, useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import UserService from 'service/UserService'

const Child = () => {
    const [isAuthed, setIsAuthed] = useState<boolean | undefined>()

    const { pathname } = useLocation()

    useEffect(() => {
        validateUser()
    }, [pathname])

    const validateUser = async () => {
        try {
            var isValid =
                (await UserService.validateAdmin()) as AxiosResponse<IBaseResponse>
            if (!isValid.data.success) {
                setIsAuthed(false)
            } else {
                setIsAuthed(true)
            }
        } catch {
            setIsAuthed(false)
        }
    }

    return (
        <Suspense fallback={<Backdrop open={true} />}>
            <>
                {isAuthed == undefined ? (
                    <h1>loading..</h1>
                ) : isAuthed == true ? (
                    <VendorDashboardLayout children={<Outlet />} />
                ) : isAuthed == false ? (
                    <Navigate to={'login'} replace />
                ) : null}
            </>
        </Suspense>
    )
}

export default Child
