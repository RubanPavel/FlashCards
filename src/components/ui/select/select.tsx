import { ComponentPropsWithoutRef, ReactNode } from 'react'

import { ChevronDownIcon } from '@radix-ui/react-icons'
import * as Label from '@radix-ui/react-label'
import * as SelectRadixUI from '@radix-ui/react-select'

import s from './select.module.scss'

import { Typography } from '../typography'

export type Options = {
  disabled?: boolean
  label?: string
  value: string
}
type SelectProps = {
  className?: string
  label?: string
  placeholder?: ReactNode
  selectOptions: Options[]
} & ComponentPropsWithoutRef<typeof SelectRadixUI.Root>
export const Select = ({ className, label, placeholder, selectOptions, ...rest }: SelectProps) => {
  return (
    <Label.Root>
      <Typography
        as={'label'}
        className={`${s.label} ${rest.disabled && s.labelDisabled}`}
        variant={'body-2'}
      >
        {label}
      </Typography>
      <SelectRadixUI.Root disabled={rest.disabled} onValueChange={rest.onValueChange} {...rest}>
        <SelectRadixUI.Trigger className={`${s.trigger} ${className}`} tabIndex={1}>
          <SelectRadixUI.Value placeholder={placeholder} />
          <ChevronDownIcon className={s.icon} />
        </SelectRadixUI.Trigger>

        <SelectRadixUI.Portal>
          <SelectRadixUI.Content className={s.content} position={'popper'} sideOffset={-1}>
            <SelectRadixUI.Viewport>
              {selectOptions.map(option => {
                return (
                  <SelectRadixUI.Item
                    className={s.item}
                    disabled={option.disabled}
                    key={option.value}
                    value={option.value}
                  >
                    <SelectRadixUI.ItemText>{option.value}</SelectRadixUI.ItemText>
                  </SelectRadixUI.Item>
                )
              })}
            </SelectRadixUI.Viewport>
          </SelectRadixUI.Content>
        </SelectRadixUI.Portal>
      </SelectRadixUI.Root>
    </Label.Root>
  )
}
