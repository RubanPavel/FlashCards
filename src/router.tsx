import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { useAuth } from '@/assets/isAuthContext'
import { CreatePassword } from '@/components/auth/create-password'
import { ForgotPassword } from '@/components/auth/forgot-password'
import { ForgotPasswordCheckEmail } from '@/components/auth/forgot-password-checkEmail/forgotPasswordCheckEmail'
import { SignIn } from '@/components/auth/login-in'
import { SignUp } from '@/components/auth/sign-up'
import { Packs } from '@/components/packs/packs-list'
import { FriendPackPage } from '@/pages/friend-pack-page/friendPack'
import { MyPackPage } from '@/pages/my-pack-page/myPack'

import { ContentLayout } from './components/layout'
import { MyProfile } from './components/user/my-profile'
//import {useGetDecksQuery} from "@/services/decks";

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
    element: <Navigate to={'/packs'} />,
    path: '/',
  },
  {
    element: <Packs />,
    path: '/packs',
  },
  {
    element: <FriendPackPage />,
    path: '/friend-pack/:id',
  },
  {
    element: <MyPackPage />,
    path: '/my-pack/:id',
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
  // const { isLoading, isError} = useGetDecksQuery({name: ''})
  //   // TODO потом поправить
  //   if (isLoading) return <p>Loading...</p>
  //   if (isError) return <p>error</p>

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
