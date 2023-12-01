import { ComponentPropsWithoutRef, ReactNode } from 'react'

import * as DialogRadix from '@radix-ui/react-dialog'
import { clsx } from 'clsx'

import s from '@/components/ui/modals/modals.module.scss'

type Props = {
  children: ReactNode
  className?: string
  trigger: ReactNode
} & ComponentPropsWithoutRef<typeof DialogRadix.Root>

export const Modals = ({ children, className, trigger }: Props) => {
  return (
    <DialogRadix.Root>
      <DialogRadix.Trigger asChild>{trigger}</DialogRadix.Trigger>
      <DialogRadix.Overlay className={s.DialogOverlay} />
      <DialogRadix.Content className={clsx(s.DialogContent, className)}>
        {children}
      </DialogRadix.Content>
    </DialogRadix.Root>
  )
}
