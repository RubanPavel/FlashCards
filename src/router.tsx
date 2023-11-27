import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { Hello } from '@/services/Hello'
import { useGetDecksQuery } from '@/services/decks/base-api'

const router = createBrowserRouter([
  {
    element: <Hello />,
    path: '/',
  },
])

export const Router = () => {
  const rez = useGetDecksQuery()

  console.log(rez)

  return <RouterProvider router={router} />
}
