import IconCheckEmail from '@/assets/icons/IconCheckEmail'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

import s from '@/components/auth/forgot-password-checkEmail/forgotPassCheckE.module.scss'
import {User} from "@/assets/userDataForTest";
import {useNavigate} from "react-router-dom";


export const ForgotPasswordCheckEmail = () => {
    const navigate = useNavigate()
    const handleNavButtonClicked = () => {
        navigate('/login')
    }
  return (
    <Card className={s.wrapperCheckEmail}>
      <Typography as={'h1'} className={s.headerCheckEmail} variant={'large'}>
        Check Email
      </Typography>
      <IconCheckEmail />
      <Typography as={'p'} className={s.textSentEmail} variant={'body-2'}>
        We’ve sent an Email with instructions to {User.email}
      </Typography>
      <Button fullWidth onClick={handleNavButtonClicked}>
        Back to Sign In
      </Button>
    </Card>
  )
}
