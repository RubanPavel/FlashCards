import { toast } from 'react-toastify'

import { errorText, optionsToast } from '@/assets/variable'
import { FormValues, SignIn } from '@/components/auth/sign-in'
import { useLoginMutation } from '@/services/auth'
import { ServerError } from '@/services/error.types'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

import s from './login-page.module.scss'
export const LoginPage = () => {
  const [login, {}] = useLoginMutation()
  const handleLogin = (formData: FormValues) => {
    login(formData)
      .unwrap()
      .catch((e: ServerError & FetchBaseQueryError) => {
        toast.error(e?.data?.message || errorText, optionsToast)
      })
  }

  return <SignIn className={s.LoginPageRoot} handleLogin={handleLogin} />
}
