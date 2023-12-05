import {ComponentPropsWithoutRef} from 'react'

import * as Slider from '@radix-ui/react-slider'

import s from './slider.module.scss'

export type Props = {
  className?: string
  onValueChange?: (value: number[]) => void
  onValueCommit?: (value: number[]) => void
  value?: number[]
} & ComponentPropsWithoutRef<typeof Slider.Root>

export const SliderRadix = ({
  className,
  max,
  min,
  onValueChange,
  onValueCommit,
  value,
  ...rest
}: Props) => {

  return (
    <div className={s.wrapper}>
      <span className={s.value}>{value?.[0]}</span>
      <Slider.Root
        className={`${s.SliderRoot} ${className}`}
        defaultValue={value}
        max={max}
        min={min}
        onValueChange={value => onValueChange?.(value)}
        onValueCommit={onValueCommit}
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
