import * as DialogRadix from '@radix-ui/react-dialog';
import {ComponentPropsWithoutRef, ReactNode} from "react";
import s from '@/components/ui/modals/modals.module.scss'
import {clsx} from "clsx";

type Props = {
  trigger: ReactNode
  children: ReactNode
  className?: string
} & ComponentPropsWithoutRef<typeof DialogRadix.Root>

export const Modals = ({ trigger, children, className }: Props) => {
  return (
    <DialogRadix.Root>
      <DialogRadix.Trigger asChild>
        {trigger}
      </DialogRadix.Trigger>
      <DialogRadix.Overlay className={s.DialogOverlay} />
      <DialogRadix.Content className={clsx(s.DialogContent, className) }>
        {children}
      </DialogRadix.Content>
    </DialogRadix.Root>
  )
}