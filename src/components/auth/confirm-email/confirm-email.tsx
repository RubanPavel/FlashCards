import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { NotFoundPage } from '@/pages/not-found-page'

import s from './confirm-email.module.scss'

type Props = {
  trigger: boolean
}

export const ConfirmEmail = ({ trigger }: Props) => {
  return trigger ? (
    <div className={s.root}>
      <Typography as={'h1'} className={s.title} variant={'large'}>
        Email Verified
      </Typography>
      <Typography as={'p'} className={s.text} variant={'subtitle-2'}>
        Thank you for registering with our service. Your email address has been successfully
        verified.
      </Typography>
      <Button as={Link} className={s.link} to={'/login'} variant={'link'}>
        Proceed to Login
      </Button>
    </div>
  ) : (
    <NotFoundPage />
  )
}
