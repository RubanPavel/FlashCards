import type { Meta, StoryObj } from '@storybook/react'
import { Header } from './'
import { Button } from '@/components/ui/button'
import { DropDownItem } from '@/components/ui/dropdown-menu/dropdownItem'
import s from '@/components/ui/dropdown-menu/dropdown-menu.module.scss'
import { Typography } from '@/components/ui/typography'
import { DropdownSeparator } from '@/components/ui/dropdown-menu/dropdownSeparator'
import { DropdownMenu } from '@/components/ui/dropdown-menu'
import AvatarRadix from '@/components/ui/avatar/avatar'
import { IconPerson } from '@/components/ui/dropdown-menu/assets/IconPerson'
import { IconLogOut } from '@/components/ui/button/assets/IconLogOut'
import IconLogo from '@/components/ui/header/assets/Iconlogo'

const meta = {
  component: Header,
  tags: ['autodocs'],
  title: 'Components/Header',
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const HeaderSignIn: Story = {
  args: {
    logo: <IconLogo />,
    children: <Button type="primary">Sign In</Button>,
  },
}

const trigger = (
  <div
    style={{
      backgroundColor: 'red',
      borderRadius: '50%',
      height: 50,
      width: 50,
    }}
  ></div>
)

export const HeaderWithAvatar: Story = {
  args: {
    logo: <IconLogo />,
    children: (
      <div
        style={{
          flexGrow: '1',
          display: 'flex',
          gap: '0.875rem',
          alignItems: 'center',
          justifyContent: 'end',
        }}
      >
        <Typography
          style={{ borderBottom: '1px dashed white' }}
          variant={'subtitle-2'}
          color={'var(--color-light-100)'}
        >
          User
        </Typography>
        <DropdownMenu trigger={trigger}>
          <DropDownItem className={s.DropdownMenuItem}>
            <AvatarRadix
              callback={() => {}}
              imageUrl={'https://i.pinimg.com/736x/19/63/b2/1963b290b9856d479b432734029ff2ee.jpg'}
              userName={'User'}
            />
            <div>
              <div style={{ marginBottom: 2 }}>
                <Typography variant={'subtitle-2'}>User</Typography>
              </div>
              <div>
                <Typography style={{ color: 'var(--color-dark-100)' }} variant={'caption'}>
                  user@incubator.com
                </Typography>
              </div>
            </div>
          </DropDownItem>
          <DropdownSeparator />
          <DropDownItem className={s.DropdownMenuItem}>
            <div className={s.iconAndDescription} onClick={() => {}}>
              <IconPerson />
              <Typography variant={'caption'}>My Profile</Typography>
            </div>
          </DropDownItem>
          <DropdownSeparator />
          <DropDownItem className={s.DropdownMenuItem}>
            <div className={s.iconAndDescription} onClick={() => {}}>
              <IconLogOut />
              <Typography variant={'caption'}>Sign Out</Typography>
            </div>
          </DropDownItem>
        </DropdownMenu>
      </div>
    ),
  },
}
