import s from "@/components/ui/dropdown-menu/dropdown-menu.module.scss";
import {Typography} from "@/components/ui/typography";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {IconEdit} from "@/components/ui/dropdown-menu/assets/IconEdit";

type Props = {
  callback: () => void
}

export const EditItem = ({callback}: Props) => {
  return (
    <DropdownMenu.Item className={s.DropdownMenuItem}>
      <div className={s.iconAndDescription} onClick={callback}>
        <IconEdit/>
        <Typography variant={'caption'}>Edit</Typography>
      </div>
    </DropdownMenu.Item>
  )
}