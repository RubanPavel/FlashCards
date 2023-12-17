import { ComponentPropsWithoutRef, ReactNode } from 'react'

import * as DialogRadix from '@radix-ui/react-dialog'
import { clsx } from 'clsx'

import s from '@/components/ui/modals/modals.module.scss'

type Props = {
  children: ReactNode
  className?: { content?: string; title?: string }
  icon?: ReactNode
  onClose?: (val: boolean) => void
  open: boolean
  showCloseButton?: boolean
  title: ReactNode
  trigger?: ReactNode
} & ComponentPropsWithoutRef<typeof DialogRadix.Root>

export const ModalsNew = ({
  children,
  className,
  icon,
  onClose,
  open = false,
  showCloseButton = true,
  title,
  trigger,
}: Props) => {
  return (
    <DialogRadix.Root onOpenChange={onClose} open={open}>
      <DialogRadix.Trigger asChild>{trigger}</DialogRadix.Trigger>
      <DialogRadix.Overlay className={s.DialogOverlay} />
      <DialogRadix.Content className={clsx(s.DialogContent, className?.content)}>
        <DialogRadix.Title className={className?.title}>{title}</DialogRadix.Title>
        {children}
        {showCloseButton && <DialogRadix.Close>{icon}</DialogRadix.Close>}
      </DialogRadix.Content>
    </DialogRadix.Root>
  )
}
