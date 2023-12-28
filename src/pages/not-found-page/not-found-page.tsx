import { ComponentPropsWithoutRef, forwardRef } from 'react'
import { Link } from 'react-router-dom'

import IconNotFound from '@/assets/icons/IconNotFound'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { clsx } from 'clsx'

import s from './not-found-page.module.scss'
import {notFoundPageContent} from "@/assets/variable";

type Props = ComponentPropsWithoutRef<'div'>

export const NotFoundPage = forwardRef<HTMLDivElement, Props>(({ className, ...rest }, ref) => {
  return (
    <div className={clsx(s.NotFoundPageRoot, className)} ref={ref} {...rest}>
      <IconNotFound />
      <Typography as={'p'} className={clsx(s.NotFoundPageText)} variant={'body-1'}>
          {notFoundPageContent.text}
      </Typography>
      <Button as={Link} className={clsx(s.NotFoundPageLink)} to={'/'} variant={'primary'}>
          {notFoundPageContent.link}
      </Button>
    </div>
  )
})
