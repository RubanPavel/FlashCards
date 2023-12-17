import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { Typography } from '@/components/ui/typography'
import * as RadioGroupRadixUi from '@radix-ui/react-radio-group'
import { clsx } from 'clsx'

import s from './radio-group.module.scss'

export type RadioGroupProps = {
  className?: string
  defaultValue?: string
  disabled?: boolean
  errorMessage?: string
  onValueChange?: (value: string) => void
  options: string[]
  value?: string
} & Omit<ComponentPropsWithoutRef<'div'>, 'dir'>

export const RadioGroup = forwardRef<ElementRef<typeof RadioGroupRadixUi.Root>, RadioGroupProps>(
  (
    {
      className,
      defaultValue,
      disabled,
      errorMessage,
      onValueChange,
      options,
      value,
      ...rest
    }: RadioGroupProps,
    ref
  ) => {
    return (
      <RadioGroupRadixUi.Root
        className={`${s.root} ${className}`}
        defaultValue={defaultValue}
        disabled={disabled}
        onValueChange={onValueChange}
        ref={ref}
        value={value}
        {...rest}
      >
        {options.map(option => (
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
        <Typography className={s.errorMessage} variant={'caption'}>
          {errorMessage}
        </Typography>
      </RadioGroupRadixUi.Root>
    )
  }
)
