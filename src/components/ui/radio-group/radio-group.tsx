import { ComponentPropsWithoutRef } from 'react'

import * as RadioGroupRadixUi from '@radix-ui/react-radio-group'

import s from './radio-group.module.scss'

import { clsx } from 'clsx'

import { Typography } from '@/components/ui/typography'

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
        <div key={option} className={s.wrapper}>
          <RadioGroupRadixUi.Item className={s.item} id={option} value={option}>
            <RadioGroupRadixUi.Indicator className={s.indicator} />
          </RadioGroupRadixUi.Item>
          <Typography
            className={s.label}
            as={'label'}
            htmlFor={option}
            variant={'body-2'}
            aria-label={clsx(disabled && 'disabled')}
          >
            {option}
          </Typography>
        </div>
      ))}
    </RadioGroupRadixUi.Root>
  )
}
