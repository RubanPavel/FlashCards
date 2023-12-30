import { CheckEmail } from '@/components/auth/check-email'
import { NotFoundPage } from '@/pages/not-found-page'
import { useAppSelector } from '@/services/store'

import s from './check-email-page.module.scss'

export const CheckEmailPage = () => {
  const userEmail = useAppSelector(state => state.authParams.email)

  if (userEmail === '') {
    return <NotFoundPage />
  }

  return <CheckEmail className={s.CheckEmailPageRoot} email={userEmail} />
}
