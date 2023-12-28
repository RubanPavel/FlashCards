import { ReactNode } from 'react'
import Skeleton from 'react-loading-skeleton'
import { Link, Outlet } from 'react-router-dom'

import { IconLogOut } from '@/assets/icons/IconLogOut'
import IconPerson from '@/assets/icons/IconPerson'
import { IconLogo } from '@/assets/icons/Iconlogo'
import { AvatarRadix } from '@/components/ui/avatar/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu } from '@/components/ui/dropdown-menu'
import { DropDownItem } from '@/components/ui/dropdown-menu/dropdownItem'
import { Header } from '@/components/ui/header'
import { Typography } from '@/components/ui/typography'
import { useGetAuthMeQuery, useLogoutMutation } from '@/services/auth'

import 'react-loading-skeleton/dist/skeleton.css'

import s from './content-layout.module.scss'

export const ContentLayout = () => {
  const { data: user, isError, isLoading } = useGetAuthMeQuery()
  const isAuthenticated = !isError
  const [logout, {}] = useLogoutMutation()

  const handleLogout = () => {
    logout()
  }

  let headerContent: ReactNode

  if (isLoading) {
    headerContent = (
      <Skeleton
        baseColor={'var(--color-dark-700)'}
        containerClassName={s.Skeleton}
        highlightColor={'var(--color-dark-500)'}
        width={100}
      />
    )
  } else if (!isAuthenticated) {
    headerContent = (
      <Button as={Link} to={'login'} type={'primary'}>
        Sign In
      </Button>
    )
  } else {
    const trigger = (
      <div className={s.TriggerRoot}>
        <Typography as={'h5'} className={s.TriggerName} variant={'subtitle-2'}>
          {user?.name}
        </Typography>
        <AvatarRadix
          className={s.TrigerAvatar}
          imageUrl={user?.avatar}
          userName={user?.name}
        ></AvatarRadix>
      </div>
    )

    headerContent = (
      <div className={s.root}>
        <DropdownMenu position={'end'} trigger={trigger}>
          <DropDownItem className={s.dropdownItem} onSelect={e => e.preventDefault()}>
            <AvatarRadix imageUrl={user?.avatar} userName={user?.name} />
            <div className={s.userInfoWrapper}>
              <Typography as={'h5'} className={s.userInfoName} variant={'subtitle-2'}>
                {user?.name}
              </Typography>
              <Typography as={'p'} className={s.userInfoEmail} variant={'caption'}>
                {user?.email}
              </Typography>
            </div>
          </DropDownItem>
          <DropDownItem className={s.dropdownItem}>
            <Button as={Link} className={s.button} to={'/profile-profile'} variant={'fullWidth'}>
              <IconPerson height={16} width={16} />
              My Profile
            </Button>
          </DropDownItem>
          <DropDownItem className={s.dropdownItem}>
            <Button className={s.button} onClick={handleLogout} variant={'fullWidth'}>
              <IconLogOut height={16} width={16} />
              Logout
            </Button>
          </DropDownItem>
        </DropdownMenu>
      </div>
    )
  }

  return (
    <>
      <Header logo={<IconLogo />}>{headerContent}</Header>
      <main className={s.main}>
        <Outlet />
      </main>
    </>
  )
}
