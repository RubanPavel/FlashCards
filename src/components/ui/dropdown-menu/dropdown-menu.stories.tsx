import {Meta, StoryObj} from '@storybook/react'
import {DropdownMenu} from "@/components/ui/dropdown-menu/dropdownMenu";
import {DropDownItem} from "@/components/ui/dropdown-menu/dropdownItem";
import s from "@/components/ui/dropdown-menu/dropdown-menu.module.scss";
import {IconLearn} from "@/components/ui/dropdown-menu/assets/IconLearn";
import {Typography} from "@/components/ui/typography";
import {DropdownSeparator} from "@/components/ui/dropdown-menu/dropdownSeparator";
import {IconEdit} from "@/components/ui/dropdown-menu/assets/IconEdit";
import IconDelete from "@/components/ui/dropdown-menu/assets/IconDelete";
import AvatarRadix from "@/components/ui/avatar/avatar";
import {IconPerson} from "@/components/ui/dropdown-menu/assets/IconPerson";
import {IconLogOut} from "@/components/ui/button/assets/IconLogOut";

const meta = {
  component: DropdownMenu,
  tags: ['autodocs'],
  title: 'Components/DropdownMenu',
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const DropDownMenuWithoutAvatar: Story = {
  parameters: {
    layout: 'centered',
  },
  args: {
    trigger:
      <div
        style={{
          width: 50,
          height: 50,
          backgroundColor: 'red',
          borderRadius: '50%',
        }}
      ></div>,
  },
  render: (args) => {
    return (
      <DropdownMenu trigger={args.trigger}>
        <DropDownItem className={s.DropdownMenuItem}>
          <div className={s.iconAndDescription} onClick={() => {
          }}>
            <IconLearn/>
            <Typography variant={'caption'}>Learn</Typography>
          </div>
        </DropDownItem>
        <DropdownSeparator/>
        <DropDownItem className={s.DropdownMenuItem}>
          <div className={s.iconAndDescription} onClick={() => {
          }}>
            <IconEdit/>
            <Typography variant={'caption'}>Edit</Typography>
          </div>
        </DropDownItem>
        <DropdownSeparator/>
        <DropDownItem className={s.DropdownMenuItem}>
          <div className={s.iconAndDescription} onClick={() => {
          }}>
            <IconDelete/>
            <Typography variant={'caption'}>Delete</Typography>
          </div>
        </DropDownItem>
      </DropdownMenu>
    )
  }
}

export const DropDownMenuWithAvatar: Story = {
  parameters: {
    layout: 'centered',
  },
  args: {
    trigger:
      <div
        style={{
          width: 50,
          height: 50,
          backgroundColor: 'red',
          borderRadius: '50%',
        }}
      ></div>,
  },
  render: (args) => {
    return (
      <DropdownMenu trigger={args.trigger}>
        <DropDownItem className={s.DropdownMenuItem}>
          <AvatarRadix
            callback={() => {
            }}
            imageUrl={'https://i.pinimg.com/736x/19/63/b2/1963b290b9856d479b432734029ff2ee.jpg'}
            userName={'User'}
          />
          <div>
            <div style={{marginBottom: 2}}>
              <Typography variant={'subtitle-2'}>User</Typography>
            </div>
            <div>
              <Typography style={{color: 'var(--color-dark-100)'}} variant={'caption'}>
                user@incubator.com
              </Typography>
            </div>
          </div>
        </DropDownItem>
        <DropdownSeparator/>
        <DropDownItem className={s.DropdownMenuItem}>
          <div className={s.iconAndDescription} onClick={() => {
          }}>
            <IconPerson/>
            <Typography variant={'caption'}>My Profile</Typography>
          </div>
        </DropDownItem>
        <DropdownSeparator/>
        <DropDownItem className={s.DropdownMenuItem}>
          <div className={s.iconAndDescription} onClick={() => {
          }}>
            <IconLogOut/>
            <Typography variant={'caption'}>Sign Out</Typography>
          </div>
        </DropDownItem>
      </DropdownMenu>
    )
  }
}
