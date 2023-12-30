import { ToastContainer } from 'react-toastify'

import { Router } from '@/router'

import 'react-toastify/dist/ReactToastify.min.css'

export function App() {
    console.log(import.meta.env.BASE_URL)
  return (
    <>
      <Router />
      <ToastContainer />
    </>
  )
}
