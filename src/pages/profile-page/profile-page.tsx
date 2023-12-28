import { Profile } from '@/components/profile'
import {
  UpdateUser,
  useGetAuthMeQuery,
  useLogoutMutation,
  useUpdateUserMutation,
} from '@/services/auth'

import s from './profile-page.module.scss'

export const ProfilePage = () => {
  const { data: user } = useGetAuthMeQuery()
  const [logout, {}] = useLogoutMutation()
  const [updateUser] = useUpdateUserMutation()

  const handleUpdateUser = (formData: UpdateUser) => {
    updateUser(formData)
  }

  return (
    <Profile
      className={s.ProfilePageRoot}
      handleUpdateUser={handleUpdateUser}
      logout={logout}
      user={user}
    />
  )
}
