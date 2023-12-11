import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ControlledCheckbox } from '@/components/ui/controlled/controlCheckbox'
import { ControlInput } from '@/components/ui/controlled/controlInput'
import { Typography } from '@/components/ui/typography'
// import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './sign-in.module.scss'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  rememberMe: z.boolean().default(false),
})

export type FormValues = z.infer<typeof loginSchema>

type Props = {
  handleLogin: (formData: FormValues) => void
}

export const SignIn = ({ handleLogin }: Props) => {
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
    reValidateMode: 'onBlur',
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: FormValues) => {
    handleLogin(data)
  }

  return (
    <Card className={s.SignInRoot}>
      <Typography as={'h1'} className={s.SignInHeader} variant={'large'}>
        Sign In
      </Typography>
      <form className={s.SignInForm} onSubmit={handleSubmit(onSubmit)}>
        {/*<DevTool control={control} />*/}
        <ControlInput
          control={control}
          errorMessage={errors.email?.message}
          label={'Email'}
          name={'email'}
        />
        <ControlInput
          control={control}
          errorMessage={errors.password?.message}
          label={'Password'}
          name={'password'}
          type={'password'}
        />
        <ControlledCheckbox control={control} name={'rememberMe'} title={'Remember me'} />
        <Button
          as={Link}
          className={s.SignInFormForgotLink}
          to={'/forgot-password'}
          variant={'icon'}
        >
          Forgot Password?
        </Button>
        <Button className={s.SignInFormButton} fullWidth type={'submit'}>
          Sign In
        </Button>
      </form>
      <Typography as={'p'} className={s.SignInText} variant={'body-2'}>
        Don&apos;t have an account?
      </Typography>
      <Button as={Link} className={s.SignInRegisterLink} to={'/register'} variant={'link'}>
        Sign Up
      </Button>
    </Card>
  )
}
