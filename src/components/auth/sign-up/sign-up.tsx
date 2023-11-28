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
    reValidateMode: 'onChange',
    resolver: zodResolver(signInFormSchema),
  })

  // TODO
  const onSubmit = (data: FormValues) => {
    return data
  }

  // TODO
  const handleNavButtonClicked = () => {
    // return <Navigate to="/sign-in" />;
  }

  return (
    <Card className={s.card}>
      <Typography variant={'large'}>Sign Up</Typography>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
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
        <Button className={s.button} fullWidth type={'submit'}>
          Sign Up
        </Button>
      </form>
      <Typography className={s.message} variant={'body-2'}>
        Already have an account?
      </Typography>
      <Button className={s.navButton} onClick={handleNavButtonClicked} variant={'link'}>
        Sign In
      </Button>
    </Card>
  )
}
