import { AxiosResponse } from 'axios'
import { IBaseResponse } from 'interface/IBaseResponse'
import { FC, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import UserService from 'service/UserService'

export const ProtectedRoute: FC<{
    children: JSX.Element
    loading: boolean
    isAuthed: boolean
}> = ({ children, isAuthed, loading }) => {
    return children
}
