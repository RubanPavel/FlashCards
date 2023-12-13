import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { NotFoundPage } from '@/pages/not-found-page'
import { clsx } from 'clsx'

import s from './confirm-email.module.scss'

type Props = {
  className?: string
  trigger: boolean
}

export const ConfirmEmail = ({ className, trigger }: Props) => {
  return trigger ? (
    <div className={clsx(s.ConfirmEmailRoot, className)}>
      <Typography as={'h1'} className={s.ConfirmEmailTitle} variant={'large'}>
        Email Verified
      </Typography>
      <Typography as={'p'} className={s.ConfirmEmailText} variant={'subtitle-2'}>
        Thank you for registering with our service. Your email address has been successfully
        verified.
      </Typography>
      <Button as={Link} className={s.ConfirmEmailLink} to={'/login'} variant={'link'}>
        Proceed to Login
      </Button>
    </div>
  ) : (
    <NotFoundPage />
  )
}
