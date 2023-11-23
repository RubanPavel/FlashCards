import { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react'

import s from './header.module.scss'
import { clsx } from 'clsx'

type Props = {
  logo?: ReactNode
} & ComponentPropsWithoutRef<'header'>

export const Header = forwardRef<HTMLHeadElement, Props>(
  ({ className, logo, children, ...rest }, ref) => {
    return (
      <header ref={ref} className={clsx(s.header, className)} {...rest}>
        {logo}
        {children}
      </header>
    )
  }
)
