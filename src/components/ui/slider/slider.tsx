import { ComponentPropsWithoutRef, forwardRef } from 'react'

import * as Slider from '@radix-ui/react-slider'

import s from './slider.module.scss'

export type Props = {
  className?: string
  onValueChange: (value: number | number[]) => void
  onValueCommit?: (value: number | number[]) => void
} & ComponentPropsWithoutRef<typeof Slider.Root>

export const SliderRadix = forwardRef(
  ({ className, onValueChange, onValueCommit, ...rest }: Props) => {
    return (
      <>
        <Slider.Root
          className={`${s.SliderRoot} ${className}`}
          defaultValue={[1, 10]}
          max={10}
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
      </>
    )
  }
)
