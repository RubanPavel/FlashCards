import { useState } from 'react'

import { IconEdit } from '@/assets/icons/IconEdit'
import { IconLogOut } from '@/assets/icons/IconLogOut'
import { profilePageData } from '@/assets/variable'
import { EditAvatar } from '@/components/profile/edit-avatar/edit-avatar'
import { ProfileForm } from '@/components/profile/profile-form'
import { AvatarRadix } from '@/components/ui/avatar/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { AuthResponse, UpdateUser } from '@/services/auth'
import { clsx } from 'clsx'

import s from './profile.module.scss'

type Props = {
  className?: string
  handleUpdateUser: (formData: UpdateUser) => void
  logout: () => void
  user: AuthResponse | undefined
}

type Trigger = 'avatar' | 'nickname'

export const Profile = ({ className, handleUpdateUser, logout, user }: Props) => {
  const [trigger, setTrigger] = useState<Trigger | null>(null)
  const { logoutButton, title } = profilePageData.profile
  const handleEditClick = (variant: Trigger) => {
    setTrigger(variant)
  }

  const handleCancelEdit = () => {
    setTrigger(null)
  }

  const logoutButtonClicked = () => {
    logout()
  }

  return (
    <Card className={clsx(s.ProfileRoot, className)}>
      <Typography as={'h1'} className={s.ProfileHeader} variant={'large'}>
        {title}
      </Typography>
      {trigger === 'avatar' ? (
        <EditAvatar handleCancelEdit={handleCancelEdit} handleUpdateUser={handleUpdateUser} />
      ) : (
        <div className={s.ProfileAvatarWrapper}>
          <AvatarRadix className={s.ProfileAvatar} imageUrl={user?.avatar} userName={user?.name} />
          {!trigger && (
            <Button
              className={s.ProfileAvatarButton}
              onClick={() => handleEditClick('avatar')}
              variant={'icon'}
            >
              <IconEdit height={16} width={16} />
            </Button>
          )}
        </div>
      )}
      {trigger === 'nickname' && (
        <ProfileForm
          handleCancelEdit={handleCancelEdit}
          handleUpdateUser={handleUpdateUser}
          user={user}
        />
      )}
      {!trigger && (
        <div className={s.ProfileContainer}>
          <div className={s.ProfileInfoWrapper}>
            <Typography as={'p'} variant={'H1'}>
              {user?.name}
            </Typography>
            <Button
              className={s.ProfileNicknameButton}
              onClick={() => handleEditClick('nickname')}
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
            {logoutButton}
          </Button>
        </div>
      )}
    </Card>
  )
}
