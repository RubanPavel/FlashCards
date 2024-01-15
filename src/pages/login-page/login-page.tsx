import { toast } from 'react-toastify'

import { errorText, optionsToast, toastInfo } from '@/assets/variable'
import { FormValues, SignIn } from '@/components/auth/sign-in'
import { Progress } from '@/components/ui/progress'
import { useLoginMutation } from '@/services/auth'
import { ServerError } from '@/services/error.types'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

import s from './login-page.module.scss'
export const LoginPage = () => {
  const [login, { isLoading }] = useLoginMutation()
  const { loginToast } = toastInfo
  const handleLogin = (formData: FormValues) => {
    login(formData)
      .unwrap()
      .then(() => {
        toast.success(loginToast, optionsToast)
      })
      .catch((e: ServerError & FetchBaseQueryError) => {
        toast.error(e?.data?.message || errorText, optionsToast)
      })
  }

  return (
    <>
      {isLoading && <Progress />}
      <SignIn className={s.LoginPageRoot} handleLogin={handleLogin} />
    </>
  )
}
