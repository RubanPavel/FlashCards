import s from "@/components/ui/dropdown-menu/dropdown-menu.module.scss";
import {IconLogOut} from "@/components/ui/button/assets/IconLogOut";
import {Typography} from "@/components/ui/typography";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

type Props = {
  callback: () => void
}

export const SignOutItem = ({callback}: Props) => {
  return (
    <DropdownMenu.Item className={s.DropdownMenuItem}>
      <div className={s.iconAndDescription} onClick={callback}>
        <IconLogOut/>
        <Typography variant={'caption'}>Sign Out</Typography>
      </div>
    </DropdownMenu.Item>
  )
}