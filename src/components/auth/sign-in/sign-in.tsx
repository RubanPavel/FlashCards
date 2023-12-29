import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { loginPageData } from '@/assets/variable'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ControlledCheckbox } from '@/components/ui/controlled/controlCheckbox'
import { ControlInput } from '@/components/ui/controlled/controlInput'
import { Typography } from '@/components/ui/typography'
// import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'
import { z } from 'zod'

import s from './sign-in.module.scss'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  rememberMe: z.boolean().default(false),
})

export type FormValues = z.infer<typeof loginSchema>

type Props = {
  className?: string
  handleLogin: (formData: FormValues) => void
}

export const SignIn = ({ className, handleLogin }: Props) => {
  const { button, checkbox, forgotLink, inputs, link, text, title } = loginPageData.signIn
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: FormValues) => {
    handleLogin(data)
  }

  return (
    <Card className={clsx(s.SignInRoot, className)}>
      <Typography as={'h1'} className={s.SignInHeader} variant={'large'}>
        {title}
      </Typography>
      <form className={s.SignInForm} onSubmit={handleSubmit(onSubmit)}>
        {/*<DevTool control={control} />*/}
        <ControlInput
          control={control}
          errorMessage={errors.email?.message}
          label={inputs.email}
          name={'email'}
        />
        <ControlInput
          control={control}
          errorMessage={errors.password?.message}
          label={inputs.password}
          name={'password'}
          type={'password'}
        />
        <ControlledCheckbox control={control} name={'rememberMe'} title={checkbox} />
        <Button
          as={Link}
          className={s.SignInFormForgotLink}
          to={'/forgot-password'}
          variant={'icon'}
        >
          {forgotLink}
        </Button>
        <Button className={s.SignInFormButton} fullWidth type={'submit'}>
          {button}
        </Button>
      </form>
      <Typography as={'p'} className={s.SignInText} variant={'body-2'}>
        {text}
      </Typography>
      <Button as={Link} className={s.SignInRegisterLink} to={'/register'} variant={'link'}>
        {link}
      </Button>
    </Card>
  )
}
