import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import s from "@/components/ui/dropdown-menu/dropdown-menu.module.scss";
import AvatarRadix from "@/components/ui/avatar/avatar";
import {Typography} from "@/components/ui/typography";
import {User} from "@/components/ui/dropdown-menu";

type Props = {
  callback: () => void
  user: User | null
}

export const AvatarUserNameItem = ({ callback, user }: Props) => {
  return (
    <DropdownMenu.Item className={s.DropdownMenuItem}>
      <AvatarRadix callback={callback} imageUrl={user ? user.imageUrl : null}
                   userName={user ? user.userName : null}/>
      <div>
        <div style={{marginBottom: 2}}>
          <Typography variant={'subtitle-2'}>
            {user && user.userName}
          </Typography>
        </div>
        <div>
          <Typography style={{color: 'var(--color-dark-100)'}} variant={'caption'}>
            {user && user.userEmail}
          </Typography>
        </div>
      </div>
    </DropdownMenu.Item>
  )
}