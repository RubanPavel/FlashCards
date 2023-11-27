import IconCheckEmail from '@/components/auth/forgot-password-checkEmail/assets/IconCheckEmail'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

import s from '@/components/auth/forgot-password-checkEmail/forgotPassCheckE.module.scss'

type Props = {
  callback: () => void
  email: string
}

export const ForgotPasswordCheckEmail = ({ callback, email }: Props) => {
  return (
    <Card className={s.wrapperForgot}>
      <Typography as={'div'} className={s.textCheckEmail} variant={'large'}>
        Check Email
      </Typography>
      <IconCheckEmail />
      <Typography as={'div'} className={s.textSentEmail} variant={'body-2'}>
        We’ve sent an Email with instructions to {email}
      </Typography>
      <Button fullWidth onClick={callback}>
        <Typography variant={'subtitle-2'}>Back to Sign In</Typography>
      </Button>
    </Card>
  )
}
