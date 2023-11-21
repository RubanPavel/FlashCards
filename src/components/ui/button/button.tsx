import {
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
  forwardRef,
} from 'react'

import { clsx } from 'clsx'

import s from './button.module.scss'

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

    const classNameComponent = clsx(s.button, s[variant], fullWidth && s.fullWidth, className)

    return <Component className={classNameComponent} ref={ref} {...rest} />
  }
)
