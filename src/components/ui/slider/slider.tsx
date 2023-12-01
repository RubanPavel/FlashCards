import { ComponentPropsWithoutRef } from 'react'

import * as Slider from '@radix-ui/react-slider'

import s from './slider.module.scss'

export type Props = {
  className?: string
  onValueChange: (value: number[]) => void
  onValueCommit?: (value: number | number[]) => void
  value: number[]
} & ComponentPropsWithoutRef<typeof Slider.Root>

export const SliderRadix = ({ className, onValueChange, onValueCommit, value, ...rest }: Props) => {
  return (
    <div className={s.wrapper}>
      <span className={s.value}>{value[0]}</span>
      <Slider.Root
        className={`${s.SliderRoot} ${className}`}
        defaultValue={[1, 10]}
        max={13}
        min={1}
        onValueChange={value => onValueChange(value)}
        onValueCommit={value => (onValueCommit ? onValueCommit(value) : null)}
        step={1}
        {...rest}
      >
        <Slider.Track className={s.SliderTrack}>
          <Slider.Range className={s.SliderRange} />
        </Slider.Track>
        <Slider.Thumb aria-label={'Volume'} className={s.SliderThumb} />
        <Slider.Thumb aria-label={'Volume'} className={s.SliderThumb} />
      </Slider.Root>
      <span className={s.value}>{value[1]}</span>
    </div>
  )
}
