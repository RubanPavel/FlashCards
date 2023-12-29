import { ComponentPropsWithoutRef, forwardRef } from 'react'
import { Link } from 'react-router-dom'

import IconNotFound from '@/assets/icons/iconNotFound/IconNotFound'
import { notFoundPageData } from '@/assets/variable'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { clsx } from 'clsx'

import s from './not-found-page.module.scss'

type Props = ComponentPropsWithoutRef<'div'>

export const NotFoundPage = forwardRef<HTMLDivElement, Props>(({ className, ...rest }, ref) => {
  return (
    <div className={clsx(s.NotFoundPageRoot, className)} ref={ref} {...rest}>
      <IconNotFound />
      <Typography as={'p'} className={clsx(s.NotFoundPageText)} variant={'body-1'}>
        {notFoundPageData.text}
      </Typography>
      <Button as={Link} className={clsx(s.NotFoundPageLink)} to={'/'} variant={'primary'}>
        {notFoundPageData.link}
      </Button>
    </div>
  )
})
