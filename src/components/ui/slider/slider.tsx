import * as Slider from '@radix-ui/react-slider';
import {ComponentPropsWithoutRef, forwardRef} from "react";
import s from './slider.module.scss'

export type Props = {
  className?: string
  onValueChange: ( value: number | number[]) => void
  onValueCommit?: (value: number | number[]) => void
} & ComponentPropsWithoutRef<typeof Slider.Root>


export const SliderRadix =
  forwardRef(({className, onValueChange, onValueCommit, ...rest  }: Props) => {
  return (
    <>
      <Slider.Root
        onValueChange={(value) => onValueChange(value)}
        onValueCommit={(value) => onValueCommit ? onValueCommit(value) : null}
        className={`${s.SliderRoot} ${className}`}
        defaultValue={[1, 10]}
        min={1} max={10}
        step={1}
        {...rest}
      >
        <Slider.Track className={s.SliderTrack}>
          <Slider.Range className={s.SliderRange}/>
        </Slider.Track>
        <Slider.Thumb  className={s.SliderThumb} aria-label="Volume"/>
        <Slider.Thumb  className={s.SliderThumb} aria-label="Volume"/>
      </Slider.Root>
    </>
  )
})