import { IconLogOut } from '@/assets/icons/IconLogOut'
import { IconLogo } from '@/assets/icons/Iconlogo'
import AvatarRadix from '@/components/ui/avatar/avatar'
import { DropdownMenu } from '@/components/ui/dropdown-menu'
import { IconPerson } from '@/components/ui/dropdown-menu/assets/IconPerson'
import { DropDownItem } from '@/components/ui/dropdown-menu/dropdownItem'
import { DropdownSeparator } from '@/components/ui/dropdown-menu/dropdownSeparator'
import { Header } from '@/components/ui/header'
import { Typography } from '@/components/ui/typography'

import s from "./packFriend.module.scss"

export const HeaderPack = () => {
  return (
    <Header>
      <IconLogo />
      <div>
        <Typography style={{ marginRight: 10 }} variant={'H3'}>
          name
        </Typography>
        <DropdownMenu
          position={'end'}
          trigger={<AvatarRadix imageUrl={''} style={{ cursor: 'pointer' }} userName={'Name'} />}
        >
          <DropDownItem>
            <AvatarRadix callback={() => {}} className={s.avatar} imageUrl={''} userName={'Name'} />
            <div>
              <div style={{ marginBottom: 2 }}>
                <Typography variant={'subtitle-2'}>name</Typography>
              </div>
              <div>
                <Typography style={{ color: 'var(--color-dark-100)' }} variant={'caption'}>
                  user@incubator.com
                </Typography>
              </div>
            </div>
          </DropDownItem>
          <DropdownSeparator />
          <DropDownItem>
            <div className={s.iconAndDescription} onClick={() => {}}>
              <IconPerson />
              <Typography variant={'caption'}>My Profile</Typography>
            </div>
          </DropDownItem>
          <DropdownSeparator />
          <DropDownItem>
            <div className={s.iconAndDescription} onClick={() => {}}>
              <IconLogOut />
              <Typography variant={'caption'}>Sign Out</Typography>
            </div>
          </DropDownItem>
        </DropdownMenu>
      </div>
    </Header>
  )
}
