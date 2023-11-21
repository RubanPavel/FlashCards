import { ComponentPropsWithoutRef } from 'react'

import { Typography } from '@/components/ui/typography'
import * as RadioGroupRadixUi from '@radix-ui/react-radio-group'
import { clsx } from 'clsx'

import s from './radio-group.module.scss'

export type Props = {
  className?: string
  defaultValue?: string
  disabled?: boolean
  options: string[]
} & Omit<ComponentPropsWithoutRef<'div'>, 'dir'>

export const RadioGroup = ({ className, defaultValue, disabled, options, ...rest }: Props) => {
  return (
    <RadioGroupRadixUi.Root
      className={`${s.root} ${className}`}
      defaultValue={defaultValue}
      disabled={disabled}
      {...rest}
    >
      {options?.map(option => (
        <div className={s.wrapper} key={option}>
          <RadioGroupRadixUi.Item className={s.item} id={option} value={option}>
            <RadioGroupRadixUi.Indicator className={s.indicator} />
          </RadioGroupRadixUi.Item>
          <Typography
            aria-label={clsx(disabled && 'disabled')}
            as={'label'}
            className={s.label}
            htmlFor={option}
            variant={'body-2'}
          >
            {option}
          </Typography>
        </div>
      ))}
    </RadioGroupRadixUi.Root>
  )
}
