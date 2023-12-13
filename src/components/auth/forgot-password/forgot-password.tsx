import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { Button } from '@//components/ui/button'
import { emailSchema } from '@/components/auth/validate/validate'
import { Card } from '@/components/ui/card'
import { ControlInput } from '@/components/ui/controlled/controlInput'
import { Typography } from '@/components/ui/typography'
// import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'
import { z } from 'zod'

import s from './forgot-password.module.scss'

const loginSchema = z.object({
  email: emailSchema,
})

export type FormValues = z.infer<typeof loginSchema>

type Props = {
  className?: string
  handleForgotPassword: (formValuer: FormValues) => void
}
export const ForgotPassword = ({ className, handleForgotPassword }: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (formData: FormValues) => {
    handleForgotPassword(formData)
  }

  return (
    <Card className={clsx(s.ForgotPasswordRoot, className)}>
      <Typography as={'h1'} className={s.ForgotPasswordHeader} variant={'large'}>
        Forgot your password?
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/*<DevTool control={control} />*/}
        <ControlInput
          control={control}
          errorMessage={errors.email?.message}
          label={'Email'}
          name={'email'}
        />
        <Typography as={'p'} className={s.ForgotPasswordText} variant={'body-2'}>
          Enter your email address and we will send you further instructions
        </Typography>
        <Button fullWidth type={'submit'}>
          <Typography as={'h2'} variant={'subtitle-2'}>
            Send instructions
          </Typography>
        </Button>
      </form>
      <Typography as={'p'} className={s.ForgotPasswordInfo} variant={'body-2'}>
        Did you remember your password?
      </Typography>
      <Button as={Link} className={s.ForgotPasswordLinkButton} to={'/login'} variant={'link'}>
        Try logging in
      </Button>
    </Card>
  )
}
