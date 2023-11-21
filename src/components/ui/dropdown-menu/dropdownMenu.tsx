import { ComponentPropsWithoutRef, ReactNode } from 'react'

import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu'

import s from './dropdown-menu.module.scss'

type Props = {
  children?: ReactNode
  trigger?: ReactNode
} & ComponentPropsWithoutRef<typeof DropdownMenuRadix.Root>

export const DropdownMenu = (props: Props) => {
  const { children, trigger, ...rest } = props

  return (
    <DropdownMenuRadix.Root {...rest}>
      <DropdownMenuRadix.Trigger>{trigger}</DropdownMenuRadix.Trigger>
      <DropdownMenuRadix.Portal>
        <DropdownMenuRadix.Content className={`${s.DropdownMenuContent}`} sideOffset={5}>
          {children}
          <DropdownMenuRadix.Arrow asChild className={s.DropdownMenuArrow} height={10} width={20}>
            <>
              <span className={s.iconTriangle}></span>
            </>
          </DropdownMenuRadix.Arrow>
        </DropdownMenuRadix.Content>
      </DropdownMenuRadix.Portal>
    </DropdownMenuRadix.Root>
  )
}
