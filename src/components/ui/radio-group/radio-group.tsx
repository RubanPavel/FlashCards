import {ComponentPropsWithoutRef, ElementRef, forwardRef} from 'react'

import {Typography} from '@/components/ui/typography'
import * as RadioGroupRadixUi from '@radix-ui/react-radio-group'
import {clsx} from 'clsx'

import s from './radio-group.module.scss'

export type RadioGroupProps = {
  className?: string
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  options: string[]
} & Omit<ComponentPropsWithoutRef<'div'>, 'dir'>

export const RadioGroup = forwardRef<ElementRef<typeof RadioGroupRadixUi.Root>, RadioGroupProps>((
  {
    className,
    defaultValue,
    value,
    onValueChange,
    disabled,
    options,
    ...rest
  }: RadioGroupProps, ref) => {
  return (
    <RadioGroupRadixUi.Root
      ref={ref}
      className={`${s.root} ${className}`}
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      {...rest}
    >
      {options.map(option => (
        <div className={s.wrapper} key={option}>
          <RadioGroupRadixUi.Item className={s.item} id={option} value={option}>
            <RadioGroupRadixUi.Indicator className={s.indicator}/>
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
})
