import { Link } from 'react-router-dom'

import { verifyEmailPageData } from '@/assets/variable'
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
  const { link, text, title } = verifyEmailPageData.confirmEmail

  return trigger ? (
    <div className={clsx(s.ConfirmEmailRoot, className)}>
      <Typography as={'h1'} className={s.ConfirmEmailTitle} variant={'large'}>
        {title}
      </Typography>
      <Typography as={'p'} className={s.ConfirmEmailText} variant={'subtitle-2'}>
        {text}
      </Typography>
      <Button as={Link} className={s.ConfirmEmailLink} to={'/login'} variant={'link'}>
        {link}
      </Button>
    </div>
  ) : (
    <NotFoundPage />
  )
}
