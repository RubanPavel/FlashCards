import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { Packs } from '@/components/packs'
import { useGetDecksQuery } from '@/services/decks/decks.service'

const router = createBrowserRouter([
  {
    element: <Packs />,
    path: '/',
  },
])

export const Router = () => {
  const rez = useGetDecksQuery()

  console.log(rez)

  return <RouterProvider router={router} />
}
