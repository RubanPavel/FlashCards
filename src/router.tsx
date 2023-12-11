import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { PackFriend } from '@/components/packs/friends-pack'
import { Packs } from '@/components/packs/packs-list'
import { CheckEmailPage } from '@/pages/check-email-page'
import { CreatePasswordPage } from '@/pages/create-password-page'
import { ForgotPasswordPage } from '@/pages/forgot-password-page'
import { LoginPage } from '@/pages/login-page'
import { NotFoundPage } from '@/pages/not-found-page'
import { ProfilePage } from '@/pages/profile-page'
import { RegisterPage } from '@/pages/register-page'
import { VerifyEmailPage } from '@/pages/verify-email-page/verify-email-page'
// import { useAppSelector } from '@/services/store'

import { Loader } from '@/components/ui/loader'
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
    element: <PackFriend />,
    path: '/friends-packs',
  },
  {
    element: <ProfilePage />,
    path: '/profile-profile',
  },
]

const notFoundRout: RouteObject[] = [
  {
    element: <NotFoundPage />,
    path: '*',
  },
]
// const routes = createBrowserRouter([
//   {
//     children: [
//       {
//         children: publicRoutes,
//         element: isAuthenticated ? <Navigate to={'/'} /> : <Outlet />,
//       },
//       {
//         children: privateRoutes,
//         element: isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />,
//       },
//       ...notFoundRout,
//     ],
//     // element: <ContentLayout />,
//   },
// ])
// export const Router = () => {
//   const { isError,isLoading } = useGetAuthMeQuery()
//   // const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)
//   const isAuthenticated = !isErro
//
//
//   return <RouterProvider router={routes} />
// }
//
//
// const router = createBrowserRouter([
//   {
//     children: [
//       {
//         children: privateRoutes,
//         element: <PrivateRoutes />,
//       },
//       {
//         children: publicRoutes,
//         element: <PublicRoutes />,
//       },
//       ...notFoundRout,
//     ],
//     element: <ContentLayout />,
//   },
// ])
//

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
