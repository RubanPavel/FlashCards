import { ComponentPropsWithoutRef, ReactNode, forwardRef } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { clsx } from 'clsx'

import s from './header.module.scss'

type Props = {
  logo?: ReactNode
} & ComponentPropsWithoutRef<'header'>

export const Header = forwardRef<HTMLHeadElement, Props>(
  ({ children, className, logo, ...rest }, ref) => {
    return (
      <header className={clsx(s.Header, className)} ref={ref} {...rest}>
        <Button className={clsx(s.HeaderLogoLink)} as={Link} to={'/'} variant={'icon'}>
          {logo}
        </Button>
        {children}
      </header>
    )
  }
)
