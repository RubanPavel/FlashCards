import { IconLogOut } from '@/assets/icons/IconLogOut'
import AvatarRadix from '@/components/ui/avatar/avatar'
import IconDelete from '@/components/ui/dropdown-menu/assets/IconDelete'
import { IconEdit } from '@/components/ui/dropdown-menu/assets/IconEdit'
import { IconLearn } from '@/components/ui/dropdown-menu/assets/IconLearn'
import { IconPerson } from '@/components/ui/dropdown-menu/assets/IconPerson'
import { DropDownItem } from '@/components/ui/dropdown-menu/dropdownItem'
import { DropdownMenu } from '@/components/ui/dropdown-menu/dropdownMenu'
import { DropdownSeparator } from '@/components/ui/dropdown-menu/dropdownSeparator'
import { Typography } from '@/components/ui/typography'
import { Meta, StoryObj } from '@storybook/react'

import s from '@/components/ui/dropdown-menu/dropdown-menu.module.scss'

const meta = {
  component: DropdownMenu,
  tags: ['autodocs'],
  title: 'Components/DropdownMenu',
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const DropDownMenuWithoutAvatar: Story = {
  args: {
    trigger: (
      <div
        style={{
          backgroundColor: 'red',
          borderRadius: '50%',
          height: 50,
          width: 50,
        }}
      ></div>
    ),
  },
  parameters: {
    layout: 'centered',
  },
  render: args => {
    return (
      <DropdownMenu trigger={args.trigger}>
        <DropDownItem className={s.DropdownMenuItem}>
          <div className={s.iconAndDescription} onClick={() => {}}>
            <IconLearn />
            <Typography variant={'caption'}>Learn</Typography>
          </div>
        </DropDownItem>
        <DropdownSeparator />
        <DropDownItem className={s.DropdownMenuItem}>
          <div className={s.iconAndDescription} onClick={() => {}}>
            <IconEdit />
            <Typography variant={'caption'}>Edit</Typography>
          </div>
        </DropDownItem>
        <DropdownSeparator />
        <DropDownItem className={s.DropdownMenuItem}>
          <div className={s.iconAndDescription} onClick={() => {}}>
            <IconDelete />
            <Typography variant={'caption'}>Delete</Typography>
          </div>
        </DropDownItem>
      </DropdownMenu>
    )
  },
}

export const DropDownMenuWithAvatar: Story = {
  args: {
    trigger: (
      <div
        style={{
          backgroundColor: 'red',
          borderRadius: '50%',
          height: 50,
          width: 50,
        }}
      ></div>
    ),
  },
  parameters: {
    layout: 'centered',
  },
  render: args => {
    return (
      <DropdownMenu trigger={args.trigger}>
        <DropDownItem className={s.DropdownMenuItem} onSelect={e => e.preventDefault()} >
          <div style={{ display: 'flex', gap: 20, marginRight: 15 }}>
            <AvatarRadix
              callback={() => {}}
              className={s.Avatar}
              imageUrl={'https://i.pinimg.com/736x/19/63/b2/1963b290b9856d479b432734029ff2ee.jpg'}
              userName={'User'}
            />
          </div>
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
    )
  },
}
