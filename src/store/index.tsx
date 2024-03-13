import { combineReducers, configureStore } from '@reduxjs/toolkit'
import AuthSlice from './Auth/Auth-slice'
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistStore,
    persistReducer,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import logger from './logger'

const persistConfig = {
    key: 'newminatis-admin',
    storage,
}

const reducers = combineReducers({
    AuthReducer: AuthSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, reducers)
export const store = configureStore({
    reducer: { Store: persistedReducer },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        }).concat(logger),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)
