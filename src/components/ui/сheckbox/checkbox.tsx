import { ElementRef, forwardRef} from 'react'

import * as Checkbox from '@radix-ui/react-checkbox'
import {CheckIcon} from '@radix-ui/react-icons'

import s from './checkbox.module.scss'

export type CheckboxProps = {
  className?: string
  checked?: boolean
  onValueChange?: (checked: boolean) => void
  disabled?: boolean
  required?: boolean
  title?: string
  id?: string
  position?: 'left'
}

export const CheckboxRadix = forwardRef<ElementRef<typeof Checkbox.Root>, CheckboxProps>((
  {
    className,
    checked,
    onValueChange,
    disabled,
    title,
    ...rest
  }, ref) => {
  return (
    <div className={`${s.wrapper} ${s.ExempleButton}`}>
      <div className={`${s.checkboxWrapper} ${disabled ? s.disabled : ''}`}>
        <Checkbox.Root
          {...rest}
          ref={ref}
          className={`${s.checkbox} ${className}`}
          checked={checked}
          onCheckedChange={onValueChange}
          disabled={disabled}
        >
          <Checkbox.Indicator className={s.checkboxIndicator}>
            <CheckIcon className={s.checkIcon}/>
          </Checkbox.Indicator>
        </Checkbox.Root>
      </div>
      <label className={s.label}>{title}</label>
    </div>
  )
})
