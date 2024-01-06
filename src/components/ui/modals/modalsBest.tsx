import { ComponentPropsWithoutRef, ReactNode } from 'react'

import { IconClose } from '@/assets/icons/IconClose'
import { Typography } from '@/components/ui/typography'
import * as DialogRadix from '@radix-ui/react-dialog'
import { clsx } from 'clsx'

import s from '@/components/ui/modals/modals.module.scss'

type Props = {
  children: ReactNode
  className?: { content?: string; title?: string }
  icon?: ReactNode
  isModalOpen: boolean
  /*isOpen: boolean*/
  onClose?: (val: boolean) => void
  setIsModalOpen: (open: boolean) => void
  showCloseButton?: boolean
  title: ReactNode
  trigger?: ReactNode
} & ComponentPropsWithoutRef<typeof DialogRadix.Root>

export const ModalsBest = ({
  children,
  className,
  isModalOpen,
  setIsModalOpen,
  /*isOpen = false,
  onClose,*/
  title,
  /* trigger,*/
}: Props) => {
  return (
    <DialogRadix.Root onOpenChange={setIsModalOpen} open={isModalOpen}>
      {/* <DialogRadix.Trigger asChild>{trigger}</DialogRadix.Trigger>*/}
      <DialogRadix.Overlay className={s.DialogOverlay} />
      <DialogRadix.Content className={clsx(s.DialogContent, className?.content)}>
        <DialogRadix.Title className={className?.title}>
          <Typography as={'p'} variant={'H2'}>
            {title}
          </Typography>
        </DialogRadix.Title>
        <DialogRadix.Close asChild>
          <button aria-label={'Close'}>
            <IconClose className={s.IconButton} />
          </button>
        </DialogRadix.Close>
        {children}
      </DialogRadix.Content>
    </DialogRadix.Root>
  )
}
