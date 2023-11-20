import {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
  forwardRef,
  ReactNode,
} from 'react'

import s from './button.module.scss'

import { clsx } from 'clsx'

export type Props<T extends ElementType = 'button'> = {
  as?: T
  children: ReactNode
  className?: string
  fullWidth?: boolean
  variant?: 'link' | 'primary' | 'secondary' | 'tertiary'
} & ComponentPropsWithoutRef<T>

export type PolymorphicRef<T extends ElementType> = ComponentPropsWithRef<T>['ref']

export const Button = forwardRef(
  <T extends ElementType = 'button'>(
    props: Props<T> & Omit<ComponentPropsWithoutRef<T>, keyof Props<T>>,
    ref: PolymorphicRef<T>
  ) => {
    const { as: Component = 'button', className, fullWidth, variant = 'primary', ...rest } = props

    const ClassNameComponent = clsx(
      `s.button ${s[variant]} ${fullWidth && s.fullWidth} ${className}`
    )
    return <Component ref={ref} className={ClassNameComponent} {...rest} />
  }
)
