import { useForm } from 'react-hook-form'

import { Button } from '@//components/ui/button'
import {
  confirmPasswordSchema,
  emailSchema,
  passwordSchema,
} from '@/components/auth/validate/validate'
import { Card } from '@/components/ui/card'
import { ControlInput } from '@/components/ui/controlled/controlInput'
import { Typography } from '@/components/ui/typography'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './sign-up.module.scss'
import {useNavigate} from "react-router-dom";

export const signInFormSchema = z
  .object({
    confirm: confirmPasswordSchema,
    email: emailSchema,
    password: passwordSchema,
  })
  .refine(data => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ['confirm'],
  })

export type FormValues = z.infer<typeof signInFormSchema>

export const SignUp = () => {
    const navigate = useNavigate()
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      confirm: '',
      email: '',
      password: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(signInFormSchema),
  })

  // TODO
  const onSubmit = (data: FormValues) => {
    return data
  }

  // TODO
  const handleNavButtonClicked = () => {
      navigate("/login")
  }

  return (
    <Card className={s.wrapperSignUp}>
      <Typography as={'h1'} className={s.headerSignUp} variant={'large'}>
        Sign Up
      </Typography>
      <form className={s.formSignUp} onSubmit={handleSubmit(onSubmit)}>
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
        <ControlInput
          control={control}
          errorMessage={errors.confirm?.message}
          label={'Confirm password'}
          name={'confirm'}
          type={'password'}
        />
        <Button className={s.formButtonSignUp} fullWidth type={'submit'}>
          Sign Up
        </Button>
      </form>
      <Typography as={'p'} className={s.messageSignUp} variant={'body-2'}>
        Already have an account?
      </Typography>
      <Button className={s.navButton} onClick={handleNavButtonClicked} variant={'link'}>
        Sign In
      </Button>
    </Card>
  )
}
