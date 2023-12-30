import { ToastContainer } from 'react-toastify'

import { Router } from '@/router'

import 'react-toastify/dist/ReactToastify.min.css'

export function App() {
  console.log('test', import.meta.env.BASE_URL)
  console.log('prod', import.meta.env.PROD)
  console.log('dev', import.meta.env.DEV)
  console.log('mod', import.meta.env.MOD)
  return (
    <>
      <Router />
      <ToastContainer />
    </>
  )
}
