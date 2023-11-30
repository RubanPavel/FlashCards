import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ControlledCheckbox } from '@/components/ui/controlled/controlCheckbox'
import { ControlInput } from '@/components/ui/controlled/controlInput'
import { Typography } from '@/components/ui/typography'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './sign-in.module.scss'
import {useNavigate} from "react-router-dom";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  rememberMe: z.boolean().default(false),
})

type FormValues = z.infer<typeof loginSchema>

export const SignIn = () => {
  const navigate = useNavigate()
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: FormValues) => {
    return data
  }

  const handleNavButtonClicked = () => {
    navigate("/sign-up")
  }

  const handleForgotPasswordClicked = () => {
    navigate("/forgot-password")
  }


  return (
    <Card className={s.wrapperSignIn}>
      <Typography as={'h1'} className={s.headerSignIn} variant={'large'}>
        Sign In
      </Typography>
      <form className={s.formSignIn} onSubmit={handleSubmit(onSubmit)}>
        <DevTool control={control} />
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
        <Button type={'button'} variant={'icon'} className={s.forgotPassword} onClick={handleForgotPasswordClicked} >
          Forgot Password?
        </Button>
        <Button className={s.formButton} fullWidth type={'submit'}>
          Sign In
        </Button>
        </form>
        <Typography as={'p'} className={s.dontAccount} variant={'body-2'}>
          Don't have an account?
        </Typography>
        <Button className={s.navButton} onClick={handleNavButtonClicked} variant={'link'}>
        Sign Up
        </Button>
    </Card>
  )
}
