import s from "@/components/ui/dropdown-menu/dropdown-menu.module.scss";
import {Typography} from "@/components/ui/typography";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import IconDelete from "@/components/ui/dropdown-menu/assets/IconDelete";

type Props = {
  callback: () => void
}

export const DeleteItem = ({callback}: Props) => {
  return (
    <DropdownMenu.Item className={s.DropdownMenuItem}>
      <div className={s.iconAndDescription} onClick={callback}>
        <IconDelete/>
        <Typography variant={'caption'}>Delete</Typography>
      </div>
    </DropdownMenu.Item>
  )
}