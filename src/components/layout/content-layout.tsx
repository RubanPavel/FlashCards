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

import s from './content-layout.module.scss'

export const ContentLayout = () => {
  const { data: user, isError } = useGetAuthMeQuery()
  const isAuthenticated = !isError
  const [logout, {}] = useLogoutMutation()

  const handleLogout = () => {
    logout()
  }

  const trigger = (
    <AvatarRadix className={s.trigger} imageUrl={user?.avatar} userName={user?.name}></AvatarRadix>
  )

  const headerContent = !isAuthenticated ? (
    <Button as={Link} to={'login'} type={'primary'}>
      Sign In
    </Button>
  ) : (
    <div className={s.root}>
      <Typography as={'h5'} className={s.userName} variant={'subtitle-2'}>
        {user?.name}
      </Typography>
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

  return (
    <>
      <Header logo={<IconLogo className={s.setPointer} />}>{headerContent}</Header>
      <main className={s.main}>
        <Outlet />
      </main>
    </>
  )
}
