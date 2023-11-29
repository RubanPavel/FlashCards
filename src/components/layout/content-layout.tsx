import { Outlet, useNavigate } from 'react-router-dom'

import { IconLogOut } from '@/assets/icons/IconLogOut'
import IconPerson from '@/assets/icons/IconPerson'
import { IconLogo } from '@/assets/icons/Iconlogo'
import { useAuth } from '@/assets/isAuthContext'
import { User } from '@/assets/userDataForTest'
import AvatarRadix from '@/components/ui/avatar/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu } from '@/components/ui/dropdown-menu'
import { DropDownItem } from '@/components/ui/dropdown-menu/dropdownItem'
import { Header } from '@/components/ui/header'
import { Typography } from '@/components/ui/typography'

import s from './content-layout.module.scss'

export const ContentLayout = () => {
  const navigate = useNavigate()
  // TODO Удалить use Auth
  const { isAuthenticated, setIsAuthenticated } = useAuth()

  const myProfileButtonClicked = () => {
    navigate('/my-profile')
  }
  const logoutButtonClicked = () => {
    setIsAuthenticated(false)
  }

  const trigger = (
    <AvatarRadix className={s.trigger} imageUrl={User.avatar} userName={User.name}></AvatarRadix>
  )

  const headerContent = !isAuthenticated ? (
    <Button type={'primary'}>Sign In</Button>
  ) : (
    <div className={s.root}>
      <Typography as={'p'} className={s.userName} variant={'subtitle-2'}>
        {User.name}
      </Typography>
      <DropdownMenu position={'end'} trigger={trigger}>
        <DropDownItem className={s.dropdownItem} onSelect={e => e.preventDefault()}>
          <AvatarRadix imageUrl={User.avatar} userName={User.name} />
          <div className={s.userInfoWrapper}>
            <Typography as={'p'} className={s.userInfoName} variant={'subtitle-2'}>
              {User.name}
            </Typography>
            <Typography as={'p'} className={s.userInfoEmail} variant={'caption'}>
              {User.email}
            </Typography>
          </div>
        </DropDownItem>
        <DropDownItem className={s.dropdownItem}>
          <Button className={s.button} onClick={myProfileButtonClicked} variant={'fullWidth'}>
            <IconPerson height={16} width={16} />
            My Profile
          </Button>
        </DropDownItem>
        <DropDownItem className={s.dropdownItem}>
          <Button className={s.button} onClick={logoutButtonClicked} variant={'fullWidth'}>
            <IconLogOut height={16} width={16} />
            Logout
          </Button>
        </DropDownItem>
      </DropdownMenu>
    </div>
  )

  return (
    <>
      <Header logo={<IconLogo />}>{headerContent}</Header>
      <main>
        <Outlet />
      </main>
    </>
  )
}
