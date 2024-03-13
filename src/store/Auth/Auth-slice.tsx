import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthState } from 'types/TStore'
import { TUser } from 'types/TUser'

const initialAuthState: AuthState = {
    Auth: null,
}

const AuthSlice = createSlice({
    name: 'Auth',
    initialState: initialAuthState,
    reducers: {
        setUser(
            state: AuthState = initialAuthState,
            action: PayloadAction<TUser>
        ) {
            state.Auth = action.payload
        },

        resetUser(state: AuthState = initialAuthState) {
            state.Auth = null
        },
    },
})
export default AuthSlice
