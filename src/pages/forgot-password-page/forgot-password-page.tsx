import { useNavigate } from 'react-router-dom'

import { ForgotPassword, FormValues } from '@/components/auth/forgot-password'
import { useRecoveryPasswordMutation } from '@/services/auth'

import s from './forgot-password-page.module.scss'

export const ForgotPasswordPage = () => {
  const [recovery, {}] = useRecoveryPasswordMutation()
  const navigate = useNavigate()
  const handleForgotPassword = (formData: FormValues) => {
    const payload = {
      email: formData.email,
      html: '<h1>Hello!</h1><p>Click <a href="http://localhost:5173/reset-password/##token##">here</a> to recover your password</p>',
      subject: 'Recover your password',
    }

    recovery(payload)
      .unwrap()
      .then(() => {
        navigate('/check-email')
      })
  }

  return (
    <ForgotPassword
      className={s.ForgotPasswordPageRoot}
      handleForgotPassword={handleForgotPassword}
    />
  )
}
