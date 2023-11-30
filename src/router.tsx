import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { useAuth } from '@/assets/isAuthContext'
import { PackFriend } from '@/components/packs/friends-pack'
import { Packs } from '@/components/packs/packs-list'

import { ContentLayout } from './components/layout'
import { MyProfile } from './components/user/my-profile'

import {SignUp} from "@/components/auth/sign-up";
import {SignIn} from "@/components/auth/login-in";
import {ForgotPassword} from "@/components/auth/forgot-password";
import {ForgotPasswordCheckEmail} from "@/components/auth/forgot-password-checkEmail/forgotPasswordCheckEmail";
import {CreatePassword} from "@/components/auth/create-password";

const publicRoutes: RouteObject[] = [
  {
    element: <SignIn />,
    path: '/login',
  },
  {
    element: <SignUp />,
    path: '/sign-up',
  },
  {
    element: <ForgotPassword />,
    path: '/forgot-password',
  },
  {
    element: <ForgotPasswordCheckEmail />,
    path: '/check-email',
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <Packs />,
    path: '/',
  },
  {
    element: <PackFriend />,
    path: '/1',
  },
  {
    element: <CreatePassword />,
    path: '/create-password',
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
