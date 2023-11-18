import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import s from '@/components/ui/dropdown-menu/dropdown-menu.module.scss'
import { IconPerson } from '@/components/ui/dropdown-menu/assets/IconPerson'
import { Typography } from '@/components/ui/typography'

type Props = {
  callback: () => void
}

export const ProfileUserItem = ({ callback }: Props) => {
  return (
    <DropdownMenu.Item className={s.DropdownMenuItem}>
      <div className={s.iconAndDescription} onClick={callback}>
        <IconPerson />
        <Typography variant={'caption'}>My Profile</Typography>
      </div>
    </DropdownMenu.Item>
  )
}
