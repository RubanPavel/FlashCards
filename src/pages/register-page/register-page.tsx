import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { errorText, registerPageContent } from '@/assets/variable'
import { FormValues, SignUp } from '@/components/auth/sign-up'
import { useCreateNewUserMutation } from '@/services/auth'
import { ServerError } from '@/services/error.types'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

import s from './register-page.module.scss'

export const RegisterPage = () => {
  const [createUser, {}] = useCreateNewUserMutation()
  const navigate = useNavigate()

  const handleRegister = (formData: FormValues) => {
    const params = {
      email: formData.email,
      html: registerPageContent.html,
      password: formData.password,
      sendConfirmationEmail: true,
      subject: registerPageContent.subject,
    }

    createUser(params)
      .unwrap()
      .then(() => {
        navigate('/login')
      })
      .catch((e: ServerError & FetchBaseQueryError) => {
        toast.error(e?.data?.message || errorText, {
          position: toast.POSITION.BOTTOM_CENTER,
        })
      })
  }

  return <SignUp className={s.RegisterPageRoot} handleRegister={handleRegister} />
}
