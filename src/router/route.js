import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
import {rootLoader} from "./rootLoader.js";
import HomeAdmin from '@/pages/Admin/Home';
import LoginAdmin from '@/pages/Admin/Auth/Login';
import Home from '@/pages/User/Home';

const router = createBrowserRouter([
    // UI Admin
    {
        path: '/admin',
        children: [
            {
                path: '',
                element: <HomeAdmin/>,
                loader: ({request, params}) => rootLoader(
                    {request, params}, true, 'LOAD_HOME_PAGE'
                )
            },
            {
                path: 'login',
                element: <LoginAdmin/>,
                loader: ({request, params}) =>
                    rootLoader({request, params}, false, 'LOAD_AUTH_PAGE'),
            },
        ]
    },
    // UI User
    {
        path: '',
        element: <Home/>,
        loader: ({request, params}) => rootLoader(
            {request, params}, true, 'LOAD_HOME_PAGE',
        )
    }
]);

export default router;
