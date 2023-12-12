import { Router } from '@/router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

export function App() {
  return (
    <>
      <Router />
      <ToastContainer />
    </>
  )
}
