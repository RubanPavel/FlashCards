import { ElementRef, forwardRef } from 'react'

import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'
import clsx from 'clsx'

import s from './checkbox.module.scss'

export type CheckboxProps = {
  checked?: boolean
  className?: string
  disabled?: boolean
  id?: string
  onValueChange?: (checked: boolean) => void
  position?: 'left'
  required?: boolean
  title?: string
}

export const CheckboxRadix = forwardRef<ElementRef<typeof Checkbox.Root>, CheckboxProps>(
  ({ checked, className, disabled, onValueChange, title, ...rest }, ref) => {
    return (
      <div className={clsx(s.wrapper, s.ExempleButton)}>
        <div className={clsx(s.checkboxWrapper, { [s.disabled]: disabled })}>
          <Checkbox.Root
            {...rest}
            checked={checked}
            className={clsx(s.checkbox, className)}
            disabled={disabled}
            onCheckedChange={onValueChange}
            ref={ref}
          >
            <Checkbox.Indicator className={s.checkboxIndicator}>
              <CheckIcon className={s.checkIcon} />
            </Checkbox.Indicator>
          </Checkbox.Root>
        </div>
        <label className={s.label}>{title}</label>
      </div>
    )
  }
)
