import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'
import { ContentLayout } from '@/components/layout/content-layout'
import { useAuth } from '@/assets/isAuthContext'
import { MyProfile } from './components/user/my-profile'
import { Packs } from '@/components/packs'

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
    element: <div>forgot-password</div>,
  },
  {
    path: '/check-email',
    element: <div>check-email</div>,
  },
]

const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Packs />,
  },
  {
    path: '/my-profile',
    element: <MyProfile />,
  },
]

const notFoundRout: RouteObject[] = [
  {
    path: '*',
    element: <div>404</div>,
  },
]

const router = createBrowserRouter([
  {
    element: <ContentLayout />,
    children: [
      {
        element: <PrivateRoutes />,
        children: privateRoutes,
      },
      {
        element: <PublicRoutes />,
        children: publicRoutes,
      },
      ...notFoundRout,
    ],
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}

function PrivateRoutes() {
  //TODO удалить useAuth
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

function PublicRoutes() {
  //TODO удалить useAuth
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <Navigate to="/" /> : <Outlet />
}
