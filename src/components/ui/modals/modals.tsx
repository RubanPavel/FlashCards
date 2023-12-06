import { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react'

import * as DialogRadix from '@radix-ui/react-dialog'
import { clsx } from 'clsx'

import s from '@/components/ui/modals/modals.module.scss'

type Props = {
  children: ReactNode
  className?: string
  icon?: ReactNode
  trigger?: ReactNode
} & ComponentPropsWithoutRef<typeof DialogRadix.Root>

export const Modals = forwardRef<HTMLButtonElement, Props>(
  ({ children, className, icon, trigger }, ref) => {
    return (
      <DialogRadix.Root>
        <DialogRadix.Trigger asChild>{trigger}</DialogRadix.Trigger>
        <DialogRadix.Overlay className={s.DialogOverlay} />
        <DialogRadix.Content className={clsx(s.DialogContent, className)}>
          {children}
          <DialogRadix.Close ref={ref}>{icon}</DialogRadix.Close>
        </DialogRadix.Content>
      </DialogRadix.Root>
    )
  }
)
