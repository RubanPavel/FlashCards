import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { Button } from '@//components/ui/button'
import { forgotPasswordPageData } from '@/assets/variable'
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
  const { button, info, inputs, link, text, title } = forgotPasswordPageData.forgotPassword
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
        {title}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/*<DevTool control={control} />*/}
        <ControlInput
          control={control}
          errorMessage={errors.email?.message}
          label={inputs.email}
          name={'email'}
        />
        <Typography as={'p'} className={s.ForgotPasswordText} variant={'body-2'}>
          {text}
        </Typography>
        <Button fullWidth type={'submit'}>
          <Typography as={'h2'} variant={'subtitle-2'}>
            {button}
          </Typography>
        </Button>
      </form>
      <Typography as={'p'} className={s.ForgotPasswordInfo} variant={'body-2'}>
        {info}
      </Typography>
      <Button as={Link} className={s.ForgotPasswordLinkButton} to={'/login'} variant={'link'}>
        {link}
      </Button>
    </Card>
  )
}
