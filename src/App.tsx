import { ToastContainer } from 'react-toastify'

import { Router } from '@/router'

import 'react-toastify/dist/ReactToastify.min.css'

export function App() {
  return (
    <>
      <Router />
      <ToastContainer />
    </>
  )
}
