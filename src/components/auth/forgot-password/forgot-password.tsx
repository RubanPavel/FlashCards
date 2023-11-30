import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Button } from '@//components/ui/button'
import { emailSchema } from '@/components/auth/validate/validate'
import { Card } from '@/components/ui/card'
import { ControlInput } from '@/components/ui/controlled/controlInput'
import { Typography } from '@/components/ui/typography'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './forgot-password.module.scss'

const loginSchema = z.object({
  email: emailSchema,
})

type FormValues = z.infer<typeof loginSchema>

export const ForgotPassword = () => {
  const navigate = useNavigate()
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: FormValues) => {
    // TODO Убрать отсюда navigate
    navigate('/check-email')

    return data
  }

  const handleNavButtonClicked = () => {
    navigate('/login')
  }

  return (
    <Card className={s.wrapperForgot}>
      <Typography as={'h1'} className={s.headerForgot} variant={'large'}>
        Forgot your password?
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DevTool control={control} />
        <ControlInput
          control={control}
          errorMessage={errors.email?.message}
          label={'Email'}
          name={'email'}
        />
        <Typography as={'p'} className={s.textEmailAddress} variant={'body-2'}>
          Enter your email address and we will send you further instructions
        </Typography>
        <Button fullWidth type={'submit'}>
          <Typography variant={'subtitle-2'}>Send instructions</Typography>
        </Button>
      </form>
      <Typography as={'p'} className={s.textAskOfPassword} variant={'body-2'}>
        Did you remember your password?
      </Typography>
      <Button className={s.navButton} onClick={handleNavButtonClicked} variant={'link'}>
        Try logging in
      </Button>
    </Card>
  )
}
