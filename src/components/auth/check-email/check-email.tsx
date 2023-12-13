import { Link } from 'react-router-dom'

import IconCheckEmail from '@/assets/icons/IconCheckEmail'
import { User } from '@/assets/userDataForTest'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { clsx } from 'clsx'

import s from './check-email.module.scss'

type Props = {
  className?: string
}

export const CheckEmail = ({ className }: Props) => {
  return (
    <Card className={clsx(s.CheckEmailRoot, className)}>
      <Typography as={'h1'} className={s.CheckEmailHeader} variant={'large'}>
        Check Email
      </Typography>
      <IconCheckEmail />
      <Typography as={'p'} className={s.CheckEmailText} variant={'body-2'}>
        We’ve sent an Email with instructions to {User.email}
      </Typography>
      <Button as={Link} fullWidth to={'/login'}>
        Back to Sign In
      </Button>
    </Card>
  )
}
