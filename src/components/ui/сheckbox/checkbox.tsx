import { ComponentPropsWithoutRef } from 'react'

import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'

import s from './checkbox.module.scss'

export type CheckboxProps = {
  checked?: boolean
  className?: string
  disabled?: boolean
  label?: string
  onCheckedChange: (checked: boolean) => void
} & ComponentPropsWithoutRef<typeof Checkbox.Root>

export const CheckboxRadix = ({
  checked,
  className,
  disabled,
  label,
  onCheckedChange,
}: CheckboxProps) => {
  return (
    <div className={`${s.wrapper} ${className}`}>
      <div className={`${s.checkboxWrapper} ${disabled ? s.disabled : ''}`}>
        <Checkbox.Root
          checked={checked}
          className={s.checkbox}
          disabled={disabled}
          onCheckedChange={onCheckedChange}
        >
          <Checkbox.Indicator className={s.checkboxIndicator}>
            <CheckIcon className={s.checkIcon} />
          </Checkbox.Indicator>
        </Checkbox.Root>
      </div>
      <label className={s.label}>{label}</label>
    </div>
  )
}
