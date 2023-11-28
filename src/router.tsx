import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { useAuth } from '@/assets/isAuthContext'
import { ContentLayout } from '@/components/layout/content-layout'
import { Packs } from '@/components/packs'

import { MyProfile } from './components/user/my-profile'

const publicRoutes: RouteObject[] = [
  {
    element: <div>login</div>,
    path: '/login',
  },
  {
    element: <div>sign-up</div>,
    path: '/sign-up',
  },
  {
    element: <div>forgot-password</div>,
    path: '/forgot-password',
  },
  {
    element: <div>check-email</div>,
    path: '/check-email',
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <Packs />,
    path: '/',
  },
  {
    element: <MyProfile />,
    path: '/my-profile',
  },
]

const notFoundRout: RouteObject[] = [
  {
    element: <div>404</div>,
    path: '*',
  },
]

const router = createBrowserRouter([
  {
    children: [
      {
        children: privateRoutes,
        element: <PrivateRoutes />,
      },
      {
        children: publicRoutes,
        element: <PublicRoutes />,
      },
      ...notFoundRout,
    ],
    element: <ContentLayout />,
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}

function PrivateRoutes() {
  //TODO удалить useAuth
  const { isAuthenticated } = useAuth()

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}

function PublicRoutes() {
  //TODO удалить useAuth
  const { isAuthenticated } = useAuth()

  return isAuthenticated ? <Navigate to={'/'} /> : <Outlet />
}
