import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { errorText, optionsToast, registerPageData, toastInfo } from '@/assets/variable'
import { FormValues, SignUp } from '@/components/auth/sign-up'
import { Progress } from '@/components/ui/progress'
import { useCreateNewUserMutation } from '@/services/auth'
import { ServerError } from '@/services/error.types'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

import s from './register-page.module.scss'

export const RegisterPage = () => {
  const [createUser, { isLoading }] = useCreateNewUserMutation()
  const navigate = useNavigate()
  const { html, subject } = registerPageData
  const { registerToast } = toastInfo

  const handleRegister = (formData: FormValues) => {
    const params = {
      email: formData.email,
      html: html,
      password: formData.password,
      sendConfirmationEmail: true,
      subject: subject,
    }

    createUser(params)
      .unwrap()
      .then(() => {
        navigate('/login')
        toast.success(registerToast, optionsToast)
      })
      .catch((e: ServerError & FetchBaseQueryError) => {
        toast.error(e?.data?.message || errorText, optionsToast)
      })
  }

  return (
    <>
      {isLoading && <Progress />}
      <SignUp className={s.RegisterPageRoot} handleRegister={handleRegister} />
    </>
  )
}
