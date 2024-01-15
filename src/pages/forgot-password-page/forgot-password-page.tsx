import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { errorText, forgotPasswordPageData, optionsToast, toastInfo } from '@/assets/variable'
import { ForgotPassword, FormValues } from '@/components/auth/forgot-password'
import { Progress } from '@/components/ui/progress'
import { useRecoveryPasswordMutation } from '@/services/auth'
import { authActions } from '@/services/auth/auth.slice'
import { ServerError } from '@/services/error.types'
import { useAppDispatch } from '@/services/store'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

import s from './forgot-password-page.module.scss'

export const ForgotPasswordPage = () => {
  const dispatch = useAppDispatch()
  const [recovery, { isLoading }] = useRecoveryPasswordMutation()
  const navigate = useNavigate()
  const { html, subject } = forgotPasswordPageData
  const { forgotPasswordToast } = toastInfo
  const handleForgotPassword = (formData: FormValues) => {
    dispatch(authActions.setEmail({ email: formData.email }))
    const payload = {
      email: formData.email,
      html: html,
      subject: subject,
    }

    recovery(payload)
      .unwrap()
      .then(() => {
        navigate('/check-email')
        toast.success(forgotPasswordToast, optionsToast)
      })
      .catch((e: ServerError & FetchBaseQueryError) => {
        toast.error(e?.data?.message || errorText, optionsToast)
      })
  }

  return (
    <>
      {isLoading && <Progress />}
      <ForgotPassword
        className={s.ForgotPasswordPageRoot}
        handleForgotPassword={handleForgotPassword}
      />
    </>
  )
}
