import { ComponentPropsWithoutRef, useEffect, useState } from 'react'

import * as Slider from '@radix-ui/react-slider'

import s from './slider.module.scss'

export type Props = {
  className?: string
  externalValues?: number[]
  max: number
  min: number
  onValueChange?: (value: number[]) => void
  onValueCommit?: (value: number[]) => void
} & Pick<ComponentPropsWithoutRef<typeof Slider.Root>, 'value'>

export const SliderRadix = ({
  className,
  externalValues,
  max,
  min,
  onValueChange,
  onValueCommit,
  ...rest
}: Props) => {

  const [values, setValues] = useState<number[]>([min, max])

  useEffect(() => {

    if (externalValues && externalValues.length) {
      setValues(externalValues)
    }
  }, [externalValues])

  return (
    <div className={s.wrapper}>
      <span className={s.value}>{values[0]}</span>
      <Slider.Root
        className={`${s.SliderRoot} ${className}`}
        max={max}
        min={min}
        onValueChange={val => setValues(val)}
        onValueCommit={onValueCommit}
        step={1}
        value={values}
        {...rest}
      >
        <Slider.Track className={s.SliderTrack}>
          <Slider.Range className={s.SliderRange} />
        </Slider.Track>
        <Slider.Thumb aria-label={'Volume'} className={s.SliderThumb} />
        <Slider.Thumb aria-label={'Volume'} className={s.SliderThumb} />
      </Slider.Root>
      <span className={s.value}>{values[1]}</span>
    </div>
  )
}
