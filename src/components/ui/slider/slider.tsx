import { ComponentPropsWithoutRef, useState } from 'react'

import * as Slider from '@radix-ui/react-slider'

import s from './slider.module.scss'

export type Props = {
  className?: string
  max?: number
  min: number
  onValueChange?: (value: number[]) => void
  onValueCommit?: (value: number[]) => void
} & Pick<ComponentPropsWithoutRef<typeof Slider.Root>, 'value'>

export const SliderRadix = ({
  className,
  max,
  min,
  onValueChange,
  onValueCommit,
  ...rest
}: Props) => {
  // TODO почему max может быть undefined, хотелось бы убрать 13?
  const [limits, setLimits] = useState<number[]>([min, max ?? 13])

  return (
    <div className={s.wrapper}>
      <span className={s.value}>{limits[0]}</span>
      <Slider.Root
        className={`${s.SliderRoot} ${className}`}
        max={max}
        min={min}
        onValueChange={value => setLimits(value)}
        onValueCommit={onValueCommit}
        step={1}
        value={limits}
        {...rest}
      >
        <Slider.Track className={s.SliderTrack}>
          <Slider.Range className={s.SliderRange} />
        </Slider.Track>
        <Slider.Thumb aria-label={'Volume'} className={s.SliderThumb} />
        <Slider.Thumb aria-label={'Volume'} className={s.SliderThumb} />
      </Slider.Root>
      <span className={s.value}>{limits[1]}</span>
    </div>
  )
}
