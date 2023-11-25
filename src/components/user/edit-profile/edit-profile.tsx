import { useState } from 'react'

import { IconEdit } from '@/assets/icons/IconEdit'
import { IconLogOut } from '@/assets/icons/IconLogOut'
import { User } from '@/assets/userDataForTest'
import AvatarRadix from '@/components/ui/avatar/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

import s from './edit-profile.module.scss'

import { EditProfileForm } from './edit-profile-form/'

export type Variant = 'Avatar' | 'Nickname'

export const EditProfile = () => {
  const [editingVariant, setEditingVariant] = useState<Variant | null>(null)

  const handleEditClick = (variant: Variant) => {
    setEditingVariant(variant)
  }

  const handleCancelEdit = () => {
    setEditingVariant(null)
  }

  return (
    <Card className={s.card}>
      <Typography variant={'large'}>Personal Information</Typography>
      {/*  TODO alt*/}
      <div className={s.avatarWrapper}>
        <AvatarRadix className={s.avatar} imageUrl={User.imageUrl} userName={User.name} />
        {/*TODO*/}
        {/*<img src={User.avatar} alt="avatar" />*/}
        {!editingVariant && (
          <Button
            className={s.avatarButton}
            onClick={() => handleEditClick('Avatar')}
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
            <Typography variant={'H1'}>{User.name}</Typography>
            <Button
              className={s.nicknameButton}
              onClick={() => handleEditClick('Nickname')}
              variant={'icon'}
            >
              <IconEdit height={16} width={16} />
            </Button>
          </div>
          <Typography className={s.email} variant={'body-2'}>
            {User.email}
          </Typography>
          <Button className={s.logoutButton} variant={'secondary'}>
            <IconLogOut height={16} width={16} />
            Logout
          </Button>
        </div>
      )}
    </Card>
  )
}
