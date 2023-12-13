import { Profile } from '@/components/profile'
import { useGetAuthMeQuery, useLogoutMutation } from '@/services/auth'

import s from './profile-page.module.scss'

export const ProfilePage = () => {
  const { data: user } = useGetAuthMeQuery()
  const [logout, {}] = useLogoutMutation()

  return <Profile className={s.ProfilePageRoot} logout={logout} user={user} />
}
