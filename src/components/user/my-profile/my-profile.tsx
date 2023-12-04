import { useState } from 'react'

import { IconEdit } from '@/assets/icons/IconEdit'
import { IconLogOut } from '@/assets/icons/IconLogOut'
import { useAuth } from '@/assets/isAuthContext'
import AvatarRadix from '@/components/ui/avatar/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

import s from './my-profile.module.scss'

import { EditProfileForm, Variant } from './edit-profile-form/'
import { useGetAuthMeQuery } from '@/services/auth'

// TODO
export const formFieldsVariant = {
  avatar: 'avatar',
  email: 'email',
  nickname: 'nickname',
} as const

export const MyProfile = () => {
  const { data: user } = useGetAuthMeQuery()
  const [editingVariant, setEditingVariant] = useState<Variant | null>(null)
  //TODO удалить
  const { setIsAuthenticated } = useAuth()

  const handleEditClick = (variant: Variant) => {
    setEditingVariant(variant)
  }

  const handleCancelEdit = () => {
    setEditingVariant(null)
  }

  const logoutButtonClicked = () => {
    setIsAuthenticated(false)
  }

  return (
    <Card className={s.wrapperMyProfile}>
      <Typography as={'h1'} className={s.headerMyProfile} variant={'large'}>
        Personal Information
      </Typography>
      <div className={s.avatarWrapper}>
        <AvatarRadix className={s.avatar} imageUrl={user?.avatar} userName={user?.name} />
        {!editingVariant && (
          <Button
            className={s.avatarButton}
            onClick={() => handleEditClick(formFieldsVariant.avatar)}
            variant={'icon'}
          >
            <IconEdit height={16} width={16} />
          </Button>
        )}
      </div>
      {editingVariant ? (
        <EditProfileForm onCancel={handleCancelEdit} variant={editingVariant} />
      ) : (
        <div className={s.container}>
          <div className={s.infoWrapper}>
            <Typography as={'p'} variant={'H1'}>
              {user?.name}
            </Typography>
            <Button
              className={s.nicknameButton}
              onClick={() => handleEditClick(formFieldsVariant.nickname)}
              variant={'icon'}
            >
              <IconEdit height={16} width={16} />
            </Button>
          </div>
          <Typography as={'p'} className={s.email} variant={'body-2'}>
            {user?.email}
          </Typography>
          <Button className={s.logoutButton} onClick={logoutButtonClicked} variant={'secondary'}>
            <IconLogOut height={16} width={16} />
            Logout
          </Button>
        </div>
      )}
    </Card>
  )
}
