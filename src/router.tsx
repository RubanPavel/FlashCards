import {createBrowserRouter, Navigate, Outlet, RouteObject, RouterProvider} from 'react-router-dom'

const publicRoutes: RouteObject[] = [
    {
        path: '/login',
        element: <div>login</div>,
    },
    {
        path: '/sign-up',
        element: <div>sign-up</div>,
    },
    {
        path: '/forgot-password',
        element: <div>forgot password</div>,
    },
    {
        path: '/check-email',
        element: <div>check email</div>,
    },
]

const privateRoutes: RouteObject[] = [
    {
        path: '/',
        element: <div>main</div>,
    },
    {
        path: '/edit-profile',
        element: <div>edit profile</div>,
    },
]

const router = createBrowserRouter([
    {
        element: <PrivateRoutes />,
        children: privateRoutes,
    },
    ...publicRoutes,
])

export const Router = () => {
    return <RouterProvider router={router} />
}

function PrivateRoutes() {
    //TODO актуализировать авторизацию
    const isAuthenticated = false

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}