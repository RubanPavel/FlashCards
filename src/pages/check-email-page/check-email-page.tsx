import { CheckEmail } from '@/components/auth/check-email'

import s from './check-email-page.module.scss'
import { useAppDispatch, useAppSelector } from '@/services/store'
import { authActions } from '@/services/auth/auth.slice'
import { NotFoundPage } from '@/pages/not-found-page'

export const CheckEmailPage = () => {
  const dispatch = useAppDispatch()
  const userEmail = useAppSelector(state => state.authParams.email)

  const handleCleanEmail = () => {
    dispatch(authActions.setEmail({ email: '' }))
  }

  if (userEmail === '') {
    return <NotFoundPage />
  }
  return (
    <CheckEmail
      className={s.CheckEmailPageRoot}
      handleCleanEmail={handleCleanEmail}
      email={userEmail}
    />
  )
}
