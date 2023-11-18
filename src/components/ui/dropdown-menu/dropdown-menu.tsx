import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import {ComponentPropsWithoutRef, forwardRef, ReactNode} from "react";
import s from './dropdown-menu.module.scss'
import {AvatarUserNameItem} from "@/components/ui/dropdown-menu/dropdownItems/AvatarUserNameItem";
import {ProfileUserItem} from "@/components/ui/dropdown-menu/dropdownItems/ProfileUserItem";
import {SignOutItem} from "@/components/ui/dropdown-menu/dropdownItems/SignOutItem";
import {LearnItem} from "@/components/ui/dropdown-menu/dropdownItems/LearnItem";
import {EditItem} from "@/components/ui/dropdown-menu/dropdownItems/EditItem";
import {DeleteItem} from "@/components/ui/dropdown-menu/dropdownItems/DeleteItem";

export type User = {
  imageUrl: string | null
  userName: string | null
  userEmail: string | null
}

type Props = {
  children: ReactNode
  className?: string
  mode: 'with-avatar' | 'without-avatar'
  callback: () => void
  user?: User
} & ComponentPropsWithoutRef<typeof DropdownMenu.Root>

export const DropdownMenuRadix = forwardRef<HTMLButtonElement, Props>(
  ({
     children,
     className,
     user,
     mode,
     callback,
     ...rest
   }, forwardedRef) => {
    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild ref={forwardedRef}>
          <button className={s.IconButton} aria-label="Customise options">
            {children}
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className={`${s.DropdownMenuContent} ${mode === 'without-avatar' && s.secondViewContent} ${className}`}
            {...rest}
            sideOffset={5}
            align={'start'}
          >
            <span className={s.iconTriangle}></span>
            <span className={s.iconLine}></span>

            {mode === 'with-avatar' &&
              <>
                <AvatarUserNameItem callback={callback} user={user ? user : null}/>
                <DropdownMenu.Separator className={s.DropdownMenuSeparator}/>
                <ProfileUserItem callback={callback}/>
                <DropdownMenu.Separator className={s.DropdownMenuSeparator}/>
                <SignOutItem callback={callback}/>
                <DropdownMenu.Arrow width={20} height={10} className={s.DropdownMenuArrow}/>
              </>}
            {mode === 'without-avatar' &&
              <>
                <LearnItem callback={callback}/>
                <DropdownMenu.Separator className={s.DropdownMenuSeparator}/>
                <EditItem callback={callback}/>
                <DropdownMenu.Separator className={s.DropdownMenuSeparator}/>
                <DeleteItem callback={callback}/>
                <DropdownMenu.Arrow width={20} height={10} className={s.DropdownMenuArrow}/>
              </>
            }
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

    )
  })