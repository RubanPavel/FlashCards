import { Profile } from '@/components/profile'
import { useGetAuthMeQuery, useLogoutMutation } from '@/services/auth'

export const ProfilePage = () => {
  const { data: user } = useGetAuthMeQuery()
  const [logout, {}] = useLogoutMutation()

  return <Profile logout={logout} user={user} />
}
