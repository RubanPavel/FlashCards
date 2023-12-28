import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { errorText } from '@/assets/variable'
import { CreatePassword, FormValues } from '@/components/auth/create-password'
import { useResetPasswordMutation } from '@/services/auth'
import { ServerError } from '@/services/error.types'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

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
          navigate('/check-email')
        })
        .catch((e: ServerError & FetchBaseQueryError) => {
          toast.error(e?.data?.message || errorText, {
            position: toast.POSITION.BOTTOM_CENTER,
          })
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
