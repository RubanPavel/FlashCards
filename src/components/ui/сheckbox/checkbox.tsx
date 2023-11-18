import { ComponentPropsWithoutRef, FC } from 'react'

import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'

import s from './checkbox.module.scss'

export const CheckboxRadix: FC<ComponentPropsWithoutRef<typeof Checkbox.Root>> = ({
  className,
  ...rest
}) => {
  return (
    <div className={s.wrapper}>
      <div className={`${s.checkboxWrapper} ${rest.disabled ? s.disabled : ''}`}>
        <Checkbox.Root className={`${s.checkbox} ${className}`} {...rest}>
          <Checkbox.Indicator className={s.checkboxIndicator}>
            <CheckIcon className={s.checkIcon} />
          </Checkbox.Indicator>
        </Checkbox.Root>
      </div>
      <label className={s.label}>{rest.title}</label>
    </div>
  )
}
