import { ComponentPropsWithoutRef, ReactNode, forwardRef } from 'react'

import { clsx } from 'clsx'

import s from './header.module.scss'

type Props = {
  logo?: ReactNode
} & ComponentPropsWithoutRef<'header'>

export const Header = forwardRef<HTMLHeadElement, Props>(
  ({ children, className, logo, ...rest }, ref) => {
    return (
      <header className={clsx(s.header, className)} ref={ref} {...rest}>
        {logo}
        {children}
      </header>
    )
  }
)
