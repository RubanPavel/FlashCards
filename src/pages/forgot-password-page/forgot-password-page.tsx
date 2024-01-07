import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { errorText, forgotPasswordPageData, optionsToast } from '@/assets/variable'
import { ForgotPassword, FormValues } from '@/components/auth/forgot-password'
import { useRecoveryPasswordMutation } from '@/services/auth'
import { authActions } from '@/services/auth/auth.slice'
import { ServerError } from '@/services/error.types'
import { useAppDispatch } from '@/services/store'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

import s from './forgot-password-page.module.scss'

export const ForgotPasswordPage = () => {
  const dispatch = useAppDispatch()
  const [recovery, {}] = useRecoveryPasswordMutation()
  const navigate = useNavigate()
  const { html, subject } = forgotPasswordPageData
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
      })
      .catch((e: ServerError & FetchBaseQueryError) => {
        toast.error(e?.data?.message || errorText, optionsToast)
      })
  }

  return (
    <ForgotPassword
      className={s.ForgotPasswordPageRoot}
      handleForgotPassword={handleForgotPassword}
    />
  )
}
