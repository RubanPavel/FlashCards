import { ComponentPropsWithoutRef, FC } from 'react'

import { Typography } from '@/components/ui/typography/typography'
import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'
import * as Label from '@radix-ui/react-label'

import s from './checkbox.module.scss'

export const CheckboxRadix: FC<
  ComponentPropsWithoutRef<typeof Checkbox.Root> & { label?: string }
> = ({ className, id, label, ...rest }) => {
  return (
    <div className={`${s.wrapper} ${className}`}>
      <div className={`${s.checkboxWrapper} ${rest.disabled ? s.disabled : ''}`}>
        <Checkbox.Root className={s.checkbox} id={'check-dox'} {...rest}>
          <Checkbox.Indicator className={s.checkboxIndicator}>
            <CheckIcon className={s.checkIcon} />
          </Checkbox.Indicator>
        </Checkbox.Root>
      </div>
      <Label.Root className={s.label} htmlFor={'check-dox'}>
        <Typography variant={'body-2'}>{label}</Typography>
      </Label.Root>
    </div>
  )
}
