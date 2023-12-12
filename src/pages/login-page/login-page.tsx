import { FormValues, SignIn } from '@/components/auth/sign-in'
import { useLoginMutation } from '@/services/auth'
import { toast } from 'react-toastify'

export const LoginPage = () => {
  const [login, {}] = useLoginMutation()

  const handleLogin = (formData: FormValues) => {
    console.log(formData)
    login(formData)
      .unwrap()
      // TODO типизация ошибки и как обрабатывать ошибки отсутствия сети, в с пустой? Случай успеха не обрабатываем?
      //  Только ошибки? Или навигацию на главную
      .catch((e: any) => {
        toast.error(e?.data?.message || 'Error', { position: toast.POSITION.BOTTOM_CENTER })
      })
  }

  return <SignIn handleLogin={handleLogin} />
}
