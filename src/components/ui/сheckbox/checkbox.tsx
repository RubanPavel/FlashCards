import {ComponentPropsWithoutRef, FC} from 'react'

import * as Checkbox from '@radix-ui/react-checkbox'
import * as Label from '@radix-ui/react-label';
import { CheckIcon } from '@radix-ui/react-icons'

import s from './checkbox.module.scss'
import {Typography} from "@/components/ui/typography/typography";

export const CheckboxRadix: FC<ComponentPropsWithoutRef<typeof Checkbox.Root> & {label?: string}> = ({
  id,
  label,
  className,
  ...rest
}) => {
  return (
    <div className={`${s.wrapper} ${className}`}>
      <div className={`${s.checkboxWrapper} ${rest.disabled ? s.disabled : ''}`}>
        <Checkbox.Root
          id={'check-dox'}
          className={s.checkbox}
          {...rest}
        >
          <Checkbox.Indicator className={s.checkboxIndicator}>
            <CheckIcon className={s.checkIcon} />
          </Checkbox.Indicator>
        </Checkbox.Root>
      </div>
      <Label.Root className={s.label} htmlFor={'check-dox'}>
        <Typography variant={'body-2'}>
          {label}
        </Typography>
      </Label.Root>
    </div>
  )
}
