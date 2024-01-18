import { toast } from 'react-toastify'

import { errorText, optionsToast, toastInfo } from '@/assets/variable'
import { Profile } from '@/components/profile'
import { Loader } from '@/components/ui/loader'
import {
  UpdateUser,
  useGetAuthMeQuery,
  useLogoutMutation,
  useUpdateUserMutation,
} from '@/services/auth'
import { ServerError } from '@/services/error.types'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

import s from './profile-page.module.scss'

export const ProfilePage = () => {
  const { data: user } = useGetAuthMeQuery()
  const [logout, { isLoading: isLoadingLogout }] = useLogoutMutation()
  const [updateUser, { isLoading: isLoadingUpdateUser }] = useUpdateUserMutation()
  const { logoutToast, updateUserToast } = toastInfo

  const handleUpdateUser = (formData: UpdateUser) => {
    updateUser(formData)
      .unwrap()
      .then(() => {
        toast.success(updateUserToast, optionsToast)
      })
      .catch((e: ServerError & FetchBaseQueryError) => {
        toast.error(e?.data?.message || errorText, optionsToast)
      })
  }

  const handleLogout = () => {
    logout()
      .unwrap()
      .then(() => {
        toast.success(logoutToast, optionsToast)
      })
      .catch((e: ServerError & FetchBaseQueryError) => {
        toast.error(e?.data?.message || errorText, optionsToast)
      })
  }

  return (
    <>
      {(isLoadingLogout || isLoadingUpdateUser) && <Loader />}
      {user && (
        <Profile
          className={s.ProfilePageRoot}
          handleLogout={handleLogout}
          handleUpdateUser={handleUpdateUser}
          user={user}
        />
      )}
    </>
  )
}
