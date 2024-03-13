import { AnyAction } from '@reduxjs/toolkit'
import { ThunkAction } from '@reduxjs/toolkit'
import { RootState } from '../index'
import { TUser } from 'types/TUser'
import authSlice from './Auth-slice'

export const authAction = authSlice.actions

export const SetUser = (
    Item: TUser
): ThunkAction<void, RootState, unknown, AnyAction> => {
    return (dispatch, getState) => {
        dispatch(authAction.setUser(Item))
    }
}

export const ResetUser = (): ThunkAction<
    void,
    RootState,
    unknown,
    AnyAction
> => {
    return (dispatch, getState) => {
        dispatch(authAction.resetUser())
    }
}
