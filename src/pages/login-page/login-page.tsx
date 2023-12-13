import { toast } from 'react-toastify'

import { FormValues, SignIn } from '@/components/auth/sign-in'
import { useLoginMutation } from '@/services/auth'

import s from './login-page.module.scss'

export const LoginPage = () => {
  const [login, {}] = useLoginMutation()

  const handleLogin = (formData: FormValues) => {
    login(formData)
      .unwrap()
      // TODO типизация ошибки и как обрабатывать ошибки отсутствия сети, в с пустой? Случай успеха не обрабатываем?
      //  Только ошибки? Или навигацию на главную
      .catch((e: any) => {
        toast.error(e?.data?.message || 'Error', { position: toast.POSITION.BOTTOM_CENTER })
      })
  }

  return <SignIn className={s.LoginPageRoot} handleLogin={handleLogin} />
}
