import { MouseEvent, ReactNode, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { Link, Outlet } from 'react-router-dom'
import { toast } from 'react-toastify'

import { IconLogOut } from '@/assets/icons/IconLogOut'
import IconPerson from '@/assets/icons/IconPerson'
import { IconLogo } from '@/assets/icons/Iconlogo'
import { contentLayoutData, errorText } from '@/assets/variable'
import { AvatarRadix } from '@/components/ui/avatar/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu } from '@/components/ui/dropdown-menu'
import { DropDownItem } from '@/components/ui/dropdown-menu/dropdownItem'
import { Header } from '@/components/ui/header'
import { Typography } from '@/components/ui/typography'
import { useGetAuthMeQuery, useLogoutMutation } from '@/services/auth'
import { ServerError } from '@/services/error.types'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

import 'react-loading-skeleton/dist/skeleton.css'

import s from './content-layout.module.scss'

export const ContentLayout = () => {
  const { data: user, isError, isLoading } = useGetAuthMeQuery()
  const isAuthenticated = !isError
  const [logout, {}] = useLogoutMutation()
  const [isDropDownMenuOpen, setIsDropDownMenuOpen] = useState(false)
  const { button } = contentLayoutData
  const handleLogout = () => {
    logout()
      .unwrap()
      .catch((e: ServerError & FetchBaseQueryError) => {
        toast.error(e?.data?.message || errorText, {
          position: toast.POSITION.BOTTOM_CENTER,
        })
      })
  }

  const handleDropdownItemClick: (e: MouseEvent<HTMLDivElement>) => void = e => {
    e.preventDefault()
  }
  const handleCloseMenu = () => {
    setIsDropDownMenuOpen(false)
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
        {button}
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
          <DropDownItem className={s.HeaderContentDropdownItem} onClick={handleDropdownItemClick}>
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
        <Outlet />
      </main>
    </>
  )
}
