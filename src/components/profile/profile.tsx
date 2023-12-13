import { useState } from 'react'

import { IconEdit } from '@/assets/icons/IconEdit'
import { IconLogOut } from '@/assets/icons/IconLogOut'
import { ProfileForm, Variant } from '@/components/profile/profile-form'
import { AvatarRadix } from '@/components/ui/avatar/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { AuthResponse } from '@/services/auth'
import { clsx } from 'clsx'

import s from './profile.module.scss'

// TODO
export const formFieldsVariant = {
  avatar: 'avatar',
  email: 'email',
  nickname: 'nickname',
} as const

type Props = {
  className?: string
  logout: () => void
  user: AuthResponse | undefined
}

export const Profile = ({ className, logout, user }: Props) => {
  const [editingVariant, setEditingVariant] = useState<Variant | null>(null)

  const handleEditClick = (variant: Variant) => {
    setEditingVariant(variant)
  }

  const handleCancelEdit = () => {
    setEditingVariant(null)
  }

  const logoutButtonClicked = () => {
    logout()
  }

  return (
    <Card className={clsx(s.ProfileRoot, className)}>
      <Typography as={'h1'} className={s.ProfileHeader} variant={'large'}>
        Personal Information
      </Typography>
      <div className={s.ProfileAvatarWrapper}>
        <AvatarRadix className={s.ProfileAvatar} imageUrl={user?.avatar} userName={user?.name} />
        {!editingVariant && (
          <Button
            className={s.ProfileAvatarButton}
            onClick={() => handleEditClick(formFieldsVariant.avatar)}
            variant={'icon'}
          >
            <IconEdit height={16} width={16} />
          </Button>
        )}
      </div>
      {editingVariant ? (
        <ProfileForm onCancel={handleCancelEdit} variant={editingVariant} />
      ) : (
        <div className={s.ProfileContainer}>
          <div className={s.ProfileInfoWrapper}>
            <Typography as={'p'} variant={'H1'}>
              {user?.name}
            </Typography>
            <Button
              className={s.ProfileNicknameButton}
              onClick={() => handleEditClick(formFieldsVariant.nickname)}
              variant={'icon'}
            >
              <IconEdit height={16} width={16} />
            </Button>
          </div>
          <Typography as={'p'} className={s.ProfileEmail} variant={'body-2'}>
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
