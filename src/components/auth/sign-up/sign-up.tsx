import { useForm } from 'react-hook-form'

import { Button } from '@//components/ui/button'
import { Card } from '@/components/ui/card'
import { ControlInput } from '@/components/ui/controlled/controlInput'
import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './sign-up.module.scss'

const loginSchema = z
  .object({
    confirm: z
      .string()
      .min(3, { message: 'Password must contain at least 3 characters' })
      .max(30, { message: 'Password must be at most 30 characters long' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(3, { message: 'Password must contain at least 3 characters' })
      .max(30, { message: 'Password must be at most 30 characters long' }),
  })
  .refine(data => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ['confirm'],
  })

type FormValues = z.infer<typeof loginSchema>

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
    resolver: zodResolver(loginSchema),
  })

  // TODO
  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <Card className={s.card}>
      <Typography variant={'large'}>Sign Up</Typography>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
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
          Submit
        </Button>
      </form>
      <Typography className={s.message} variant={'body-2'}>
        Already have an account?
      </Typography>
      {/* TODO fix Link*/}
      {/* <Button variant={'link'} as={'Link'} to="/sign-in">Sign In</Button>*/}
      <Button as={'a'} className={s.button} variant={'link'}>
        Sign In
      </Button>
    </Card>
  )
}
