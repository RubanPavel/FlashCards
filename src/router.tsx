import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { CheckEmailPage } from '@/pages/check-email-page'
import { CreatePasswordPage } from '@/pages/create-password-page'
import { ForgotPasswordPage } from '@/pages/forgot-password-page'
import { FriendPackPage } from '@/pages/friend-pack-page'
import { LearnPage } from '@/pages/learn-page/learn-page'
import { LoginPage } from '@/pages/login-page'
import { MyPackPage } from '@/pages/my-pack-page'
import { NotFoundPage } from '@/pages/not-found-page'
import { PacksPage } from '@/pages/packs-page/packs-page'
import { ProfilePage } from '@/pages/profile-page'
import { RegisterPage } from '@/pages/register-page'
import { VerifyEmailPage } from '@/pages/verify-email-page/verify-email-page'

import { ContentLayout, useAuthContext } from './components/layout'

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
    element: <PacksPage />,
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
  const { isAuth } = useAuthContext()

  return isAuth ? <Outlet /> : <Navigate to={'/login'} />
}

function PublicRoutes() {
  const { isAuth } = useAuthContext()

  return isAuth ? <Navigate to={'/'} /> : <LoginPage />
}
