import { Header } from '@/components/ui/header'
import { User } from '@/assets/userDataForTest'
import { Button } from '@/components/ui/button'
import { IconLogo } from '@/assets/icons/Iconlogo'
import { Typography } from '@/components/ui/typography'
import { DropdownMenu } from '@/components/ui/dropdown-menu'
import { DropDownItem } from '@/components/ui/dropdown-menu/dropdownItem'
import s from './content-layout.module.scss'
import AvatarRadix from '@/components/ui/avatar/avatar'
import { DropdownSeparator } from '@/components/ui/dropdown-menu/dropdownSeparator'
import { IconPerson } from '@/components/ui/dropdown-menu/assets/IconPerson'
import { IconLogOut } from '@/assets/icons/IconLogOut'
import { useAuth } from '@/assets/isAuthContext'
import { Outlet, useNavigate } from 'react-router-dom'

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
    <AvatarRadix
      imageUrl={User.avatar}
      userName={User.name}
      style={{
        backgroundColor: 'var(--color-dark-900)',
        borderRadius: '50%',
        height: 50,
        width: 50,
        marginLeft: '5px',
      }}
    ></AvatarRadix>
  )

  const headerContent = !isAuthenticated ? (
    <Button type={'primary'}>Sign In</Button>
  ) : (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        flexGrow: '1',
        gap: '0.5rem',
        justifyContent: 'end',
      }}
    >
      <Typography
        color={'var(--color-light-100)'}
        style={{ borderBottom: '1px dashed white' }}
        variant={'subtitle-2'}
      >
        {User.name}
      </Typography>
      <DropdownMenu position={'end'} trigger={trigger}>
        <DropDownItem style={{ gap: '0.5rem' }} className={s.dropdown}>
          <AvatarRadix
            // callback={() => {}}
            imageUrl={User.avatar}
            userName={User.name}
          />
          <div>
            <div style={{ marginBottom: 2 }}>
              <Typography variant={'subtitle-2'}>{User.name}</Typography>
            </div>
            <div>
              <Typography style={{ color: 'var(--color-dark-100)' }} variant={'caption'}>
                {User.email}
              </Typography>
            </div>
          </div>
        </DropDownItem>
        <DropdownSeparator />
        <DropDownItem className={s.wrapper}>
          <Button
            style={{
              padding: '0',
              backgroundColor: 'transparent',
              outline: 'none',
              boxShadow: 'none',
              gap: '0.5rem',
            }}
            className={s.button}
            onClick={myProfileButtonClicked}
          >
            <IconPerson width={16} height={16} />
            <Typography variant={'caption'}>My Profile</Typography>
          </Button>
        </DropDownItem>
        <DropdownSeparator />
        <DropDownItem className={s.wrapper}>
          <Button
            style={{
              padding: '0',
              backgroundColor: 'transparent',
              outline: 'none',
              boxShadow: 'none',
              gap: '0.5rem',
            }}
            className={s.button}
            onClick={logoutButtonClicked}
          >
            <IconLogOut style={{ margin: '0', padding: '0' }} width={16} height={16} />
            <Typography variant={'caption'}>Logout</Typography>
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
