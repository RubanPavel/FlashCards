import { ComponentPropsWithoutRef, ReactNode } from 'react'

import * as DialogRadix from '@radix-ui/react-dialog'
import { clsx } from 'clsx'

import s from '@/components/ui/modals/modals.module.scss'

type Props = {
  children: ReactNode
  className?: string
  icon?: ReactNode
  trigger?: ReactNode
} & ComponentPropsWithoutRef<typeof DialogRadix.Root>

export const Modals = ({ children, className, icon, trigger }: Props) => {
  return (
    <DialogRadix.Root>
      <DialogRadix.Trigger asChild>{trigger}</DialogRadix.Trigger>
      <DialogRadix.Overlay className={s.DialogOverlay} />
      <DialogRadix.Content className={clsx(s.DialogContent, className)}>
        {children}
        <DialogRadix.Close>{icon}</DialogRadix.Close>
      </DialogRadix.Content>
    </DialogRadix.Root>
  )
}
