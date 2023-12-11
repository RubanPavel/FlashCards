import { useNavigate } from 'react-router-dom'

import { FormValues, SignUp } from '@/components/auth/sign-up'
import { useCreateNewUserMutation } from '@/services/auth'

export const RegisterPage = () => {
  const [createUser, {}] = useCreateNewUserMutation()
  const navigate = useNavigate()

  const handleRegister = (formData: FormValues) => {
    const params = {
      email: formData.email,
      html: '<b>Hello!</b><br/>Please confirm your email by clicking on the link below:<br/><a href="http://localhost:5173/confirm-email/##token##">Confirm email</a>. If it doesn\'t work, copy and paste the following link in your browser:<br/>http://localhost:5173/confirm-email/##token##',
      password: formData.password,
      sendConfirmationEmail: true,
      subject: 'Confirm your email',
    }

    createUser(params)
      .unwrap()
      .then(() => {
        navigate('/login')
      })
      .catch(error => {
        console.error('Ошибка при создании пользователя', error)
      })
  }

  return <SignUp handleRegister={handleRegister} />
}
