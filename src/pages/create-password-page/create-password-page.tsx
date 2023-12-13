import { useNavigate, useParams } from 'react-router-dom'

import { CreatePassword, FormValues } from '@/components/auth/create-password'
import { useResetPasswordMutation } from '@/services/auth'

import s from './create-password-page.module.scss'

export const CreatePasswordPage = () => {
  const { token } = useParams()
  const navigate = useNavigate()
  const [resetPassword, {}] = useResetPasswordMutation()
  const handleCreatePassword = (formData: FormValues) => {
    if (token) {
      const payload = {
        password: formData.password,
        token: token,
      }

      resetPassword(payload)
        .unwrap()
        .then(() => {
          // console.log('useResetPasswordMutation')
          navigate('/check-email')
        })
    }
  }

  return (
    <CreatePassword
      className={s.CreatePasswordPageRoot}
      handleCreatePassword={handleCreatePassword}
    />
  )
}
