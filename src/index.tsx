import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material';
import { blue, indigo } from '@mui/material/colors';
import { RouterProvider } from "react-router-dom"
import { routes } from '@routes/main'
import { Provider } from 'react-redux';
import store from '@redux/store';
import './app/translate/i18nt'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const mdTheme = createTheme({ palette: { primary: { main: indigo[500] }, secondary: { main: blue.A400 } } })

root.render(
    <Provider store={store}>
        <ThemeProvider theme={mdTheme}>
            <RouterProvider router={routes} />
        </ThemeProvider>
    </Provider>
);