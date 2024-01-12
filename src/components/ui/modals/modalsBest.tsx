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
  onClose?: (val: boolean) => void
  setIsModalOpen: (open: boolean) => void
  showCloseButton?: boolean
  title: ReactNode
} & ComponentPropsWithoutRef<typeof DialogRadix.Root>

export const ModalsBest = ({
  children,
  className,
  isModalOpen,
  setIsModalOpen,
  showCloseButton = true,
  title,
}: Props) => {
  return (
    <DialogRadix.Root onOpenChange={setIsModalOpen} open={isModalOpen}>
      <DialogRadix.Overlay className={s.DialogOverlay} />
      {/*<DialogRadix.Content className={clsx(s.DialogContent)}>*/}
      <DialogRadix.Content className={clsx(s.DialogContent, className?.content)}>
        <DialogRadix.Title className={clsx(s.DialogTitle, className?.title)}>
          <Typography as={'p'} variant={'H2'}>
            {title}
          </Typography>
        </DialogRadix.Title>
        {children}
        <DialogRadix.Close asChild>
          {showCloseButton && (
            <button aria-label={'Close'}>
              <IconClose className={s.IconButton} />
            </button>
          )}
        </DialogRadix.Close>
      </DialogRadix.Content>
    </DialogRadix.Root>
  )
}
