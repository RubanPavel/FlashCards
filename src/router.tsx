import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { Packs } from '@/components/packs'

const publicRoutes: RouteObject[] = [
  {
    /*element: <div>login</div>,*/
    element: <Packs />,
    path: '/login',
  },
  {
    element: <div>sign-up</div>,
    path: '/sign-up',
  },
  {
    element: <div>forgot password</div>,
    path: '/forgot-password',
  },
  {
    element: <div>check email</div>,
    path: '/check-email',
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <div>main</div>,
    path: '/',
  },
  {
    element: <div>edit profile</div>,
    path: '/edit-profile',
  },
]

const router = createBrowserRouter([
  {
    children: privateRoutes,
    element: <PrivateRoutes />,
  },
  ...publicRoutes,
])

export const Router = () => {
  return <RouterProvider router={router} />
}

function PrivateRoutes() {
  //TODO актуализировать авторизацию
  const isAuthenticated = false

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}
