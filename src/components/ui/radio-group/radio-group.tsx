import { ComponentPropsWithoutRef } from 'react'

import * as RadioGroupRadixUi from '@radix-ui/react-radio-group'

import s from './radio-group.module.scss'

export type RadioGroupProps = {
  defaultValue?: string
  disabled?: boolean
  labels: { id: string; value: string }[]
  onChange?: () => void
} & Omit<ComponentPropsWithoutRef<'div'>, 'dir'>

export const RadioGroup = ({
  className,
  defaultValue,
  disabled,
  labels,
  onChange,
  ...rest
}: RadioGroupProps) => {
  return (
    <form>
      <RadioGroupRadixUi.Root
        className={`${s.RadioGroupRoot} ${className}`}
        defaultValue={defaultValue}
        disabled={disabled}
        {...rest}
      >
        {labels.map(l => (
          <div className={s.RadioGroupWrapper}>
            <RadioGroupRadixUi.Item className={s.RadioGroupItem} id={l.id} value={l.value}>
              <RadioGroupRadixUi.Indicator className={s.RadioGroupIndicator} />
            </RadioGroupRadixUi.Item>
            <label aria-label={`${disabled && 'disabled'}`} className={s.Label} htmlFor={l.id}>
              {l.value}
            </label>
          </div>
        ))}
      </RadioGroupRadixUi.Root>
    </form>
  )
}
