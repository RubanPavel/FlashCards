import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { Packs } from '@/components/packs/packs-list'
import { Loader } from '@/components/ui/loader'
import { CheckEmailPage } from '@/pages/check-email-page'
import { CreatePasswordPage } from '@/pages/create-password-page'
import { ForgotPasswordPage } from '@/pages/forgot-password-page'
import { FriendPackPage } from '@/pages/friend-pack-page'
import { LearnPage } from '@/pages/learn-page/learn-page'
import { LoginPage } from '@/pages/login-page'
import { MyPackPage } from '@/pages/my-pack-page'
import { NotFoundPage } from '@/pages/not-found-page'
import { ProfilePage } from '@/pages/profile-page'
import { RegisterPage } from '@/pages/register-page'
import { VerifyEmailPage } from '@/pages/verify-email-page/verify-email-page'
import { useGetAuthMeQuery } from '@/services/auth'

import { ContentLayout } from './components/layout'

const publicRoutes: RouteObject[] = [
  {
    element: <LoginPage />,
    path: '/login',
  },
  {
    element: <RegisterPage />,
    path: '/register',
  },
  {
    element: <ForgotPasswordPage />,
    path: '/forgot-password',
  },
  {
    element: <CheckEmailPage />,
    path: '/check-email',
  },
  {
    element: <VerifyEmailPage />,
    path: '/verify-email/:userId',
  },
  {
    element: <CreatePasswordPage />,
    path: '/reset-password/:userId',
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <Navigate to={'/packs'} />,
    path: '/',
  },
  {
    element: <Packs />,
    path: '/packs',
  },
  {
    element: <ProfilePage />,
    path: '/profile',
  },
  {
    element: <MyPackPage />,
    path: '/my-pack/:id',
  },
  {
    element: <FriendPackPage />,
    path: '/friend-pack/:id',
  },
  {
    element: <LearnPage />,
    path: '/learn/:id',
  },
]

const notFoundRoute: RouteObject[] = [
  {
    element: <NotFoundPage />,
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
      ...notFoundRoute,
    ],
    element: <ContentLayout />,
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}

function PrivateRoutes() {
  const { isError, isLoading } = useGetAuthMeQuery()

  if (isLoading) {
    return <Loader />
  }
  const isAuthenticated = !isError

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}

function PublicRoutes() {
  const { isError, isLoading } = useGetAuthMeQuery()

  if (isLoading) {
    return <Loader />
  }
  const isAuthenticated = !isError

  return isAuthenticated ? <Navigate to={'/'} /> : <Outlet />
}
