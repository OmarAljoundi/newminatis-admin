import { SnackbarProvider } from 'notistack'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Root from 'routes/Root'
import { persistor, store } from 'store'
import MuiTheme from 'theme/MuiTheme'
import './styles/css/main.css'
const queryClient = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <SnackbarProvider>
                <QueryClientProvider client={queryClient}>
                    <MuiTheme children={<Root />} />
                </QueryClientProvider>
            </SnackbarProvider>
        </PersistGate>
    </Provider>
)
