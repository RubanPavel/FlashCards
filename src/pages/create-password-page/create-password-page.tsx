import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { createPasswordPageData, errorText, optionsToast } from '@/assets/variable'
import { CreatePassword, FormValues } from '@/components/auth/create-password'
import { useResetPasswordMutation } from '@/services/auth'
import { ServerError } from '@/services/error.types'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

import s from './create-password-page.module.scss'

export const CreatePasswordPage = () => {
  const { userId } = useParams()
  const navigate = useNavigate()
  const [resetPassword, {}] = useResetPasswordMutation()
  const { info } = createPasswordPageData
  const handleCreatePassword = (formData: FormValues) => {
    if (userId) {
      const payload = {
        password: formData.password,
        token: userId,
      }

      resetPassword(payload)
        .unwrap()
        .then(() => {
          navigate('/login')
          toast.success(info, optionsToast)
        })
        .catch((e: ServerError & FetchBaseQueryError) => {
          toast.error(e?.data?.message || errorText, optionsToast)
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
