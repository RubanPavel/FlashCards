import { ReactNode, useState } from 'react'
import { Link, Outlet, useLocation, useOutletContext } from 'react-router-dom'
import { toast } from 'react-toastify'

import { IconLogOut } from '@/assets/icons/IconLogOut'
import IconPerson from '@/assets/icons/IconPerson'
import { IconLogo } from '@/assets/icons/Iconlogo'
import { contentLayoutData, errorText, optionsToast } from '@/assets/variable'
import { AvatarRadix } from '@/components/ui/avatar/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu } from '@/components/ui/dropdown-menu'
import { DropDownItem } from '@/components/ui/dropdown-menu/dropdownItem'
import { Header } from '@/components/ui/header'
import { Loader } from '@/components/ui/loader'
import { Typography } from '@/components/ui/typography'
import { useGetAuthMeQuery, useLogoutMutation } from '@/services/auth'
import { ServerError } from '@/services/error.types'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

import s from './content-layout.module.scss'

type AuthContext = {
  isAuth: boolean
}

export const useAuthContext = () => {
  return useOutletContext<AuthContext>()
}

export const ContentLayout = () => {
  const { data: user, isError, isLoading } = useGetAuthMeQuery()
  const isAuthenticated = !isError
  const [logout, {}] = useLogoutMutation()
  const [isDropDownMenuOpen, setIsDropDownMenuOpen] = useState(false)
  const { buttonLogin, buttonRegister } = contentLayoutData
  const location = useLocation()

  const handleLogout = () => {
    logout()
      .unwrap()
      .catch((e: ServerError & FetchBaseQueryError) => {
        toast.error(e?.data?.message || errorText, optionsToast)
      })
  }

  const handleCloseMenu = () => {
    setIsDropDownMenuOpen(false)
  }

  let headerContent: ReactNode

  const isAuth = !isError

  if (isLoading) {
    return <Loader />
  }

  if (!isAuthenticated && location.pathname !== '/login') {
    headerContent = (
      <Button as={Link} to={'login'} type={'primary'}>
        {buttonLogin}
      </Button>
    )
  } else if (!isAuthenticated && location.pathname === '/login') {
    headerContent = (
      <Button as={Link} to={'register'} type={'primary'}>
        {buttonRegister}
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
      <div className={s.HeaderContentRoot}>
        <DropdownMenu
          onOpenChange={newOpenState => setIsDropDownMenuOpen(newOpenState)}
          open={isDropDownMenuOpen}
          position={'end'}
          trigger={trigger}
        >
          <DropDownItem className={s.HeaderContentDropdownItem} disabled>
            <AvatarRadix imageUrl={user?.avatar} userName={user?.name} />
            <div className={s.HeaderContentUserInfoWrapper}>
              <Typography as={'h5'} className={s.HeaderContentUserInfoName} variant={'subtitle-2'}>
                {user?.name}
              </Typography>
              <Typography as={'p'} className={s.HeaderContentUserInfoEmail} variant={'caption'}>
                {user?.email}
              </Typography>
            </div>
          </DropDownItem>
          <DropDownItem className={s.HeaderContentDropdownItem} onClick={handleCloseMenu}>
            <Button
              as={Link}
              className={s.HeaderContentButton}
              to={'/profile'}
              variant={'fullWidth'}
            >
              <IconPerson height={16} width={16} />
              My Profile
            </Button>
          </DropDownItem>
          <DropDownItem className={s.HeaderContentDropdownItem}>
            <Button className={s.HeaderContentButton} onClick={handleLogout} variant={'fullWidth'}>
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
      <main className={s.Main}>
        <Outlet context={{ isAuth } satisfies AuthContext} />
      </main>
    </>
  )
}
