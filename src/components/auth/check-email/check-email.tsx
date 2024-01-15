import { Link } from 'react-router-dom'

import IconCheckEmail from '@/assets/icons/IconCheckEmail'
import { CheckEmailPage } from '@/assets/variable'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { clsx } from 'clsx'

import s from './check-email.module.scss'

type Props = {
  className?: string
  email: string
}

export const CheckEmail = ({ className, email }: Props) => {
  const { button, info, title } = CheckEmailPage

  return (
    <Card className={clsx(s.CheckEmailRoot, className)}>
      <Typography as={'h1'} className={s.CheckEmailHeader} variant={'large'}>
        {title}
      </Typography>
      <IconCheckEmail />
      <Typography as={'p'} className={s.CheckEmailText} variant={'body-2'}>
        {`${info} ${email}`}
      </Typography>
      <Button as={Link} fullWidth to={'/login'}>
        {button}
      </Button>
    </Card>
  )
}
