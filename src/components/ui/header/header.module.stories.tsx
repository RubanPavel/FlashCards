import type { Meta, StoryObj } from '@storybook/react'

import { IconLogOut } from '@/components/assets/icons/IconLogOut'
import IconLogo from '@/components/assets/icons/Iconlogo'
import AvatarRadix from '@/components/ui/avatar/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu } from '@/components/ui/dropdown-menu'
import { IconPerson } from '@/components/ui/dropdown-menu/assets/IconPerson'
import { DropDownItem } from '@/components/ui/dropdown-menu/dropdownItem'
import { DropdownSeparator } from '@/components/ui/dropdown-menu/dropdownSeparator'
import { Typography } from '@/components/ui/typography'

import s from '@/components/ui/dropdown-menu/dropdown-menu.module.scss'

import { Header } from './'

const meta = {
  component: Header,
  tags: ['autodocs'],
  title: 'Components/Header',
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const HeaderSignIn: Story = {
  args: {
    children: <Button type={'primary'}>Sign In</Button>,
    logo: <IconLogo />,
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
    children: (
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: '1',
          gap: '0.875rem',
          justifyContent: 'end',
        }}
      >
        <Typography
          color={'var(--color-light-100)'}
          style={{ borderBottom: '1px dashed white' }}
          variant={'subtitle-2'}
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
    logo: <IconLogo />,
  },
}
