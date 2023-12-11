import { FormValues, SignIn } from '@/components/auth/sign-in'
import { useLoginMutation } from '@/services/auth'

export const LoginPage = () => {
  const [login, {}] = useLoginMutation()

  const handleLogin = (formData: FormValues) => {
    login(formData)
      .unwrap()
      .then(() => {
        // navigate('/')
      })
  }

  return <SignIn handleLogin={handleLogin} />
}
