import s from '@/components/ui/dropdown-menu/dropdown-menu.module.scss'
import { Typography } from '@/components/ui/typography'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { IconLearn } from '@/components/ui/dropdown-menu/assets/IconLearn'

type Props = {
  callback: () => void
}

export const LearnItem = ({ callback }: Props) => {
  return (
    <DropdownMenu.Item className={s.DropdownMenuItem}>
      <div className={s.iconAndDescription} onClick={callback}>
        <IconLearn />
        <Typography variant={'caption'}>Learn</Typography>
      </div>
    </DropdownMenu.Item>
  )
}
