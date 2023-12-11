import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { Button } from '@//components/ui/button'
import {
  confirmPasswordSchema,
  emailSchema,
  passwordSchema,
} from '@/components/auth/validate/validate'
import { Card } from '@/components/ui/card'
import { ControlInput } from '@/components/ui/controlled/controlInput'
import { Typography } from '@/components/ui/typography'
// import { DevTool } from '@hookform/devtools'
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

type Props = {
  handleRegister: (formData: FormValues) => void
}

export const SignUp = ({ handleRegister }: Props) => {
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

  const onSubmit = (formData: FormValues) => {
    handleRegister(formData)
  }

  return (
    <Card className={s.SignUpRoot}>
      <Typography as={'h1'} className={s.SignUpHeader} variant={'large'}>
        Sign Up
      </Typography>
      <form className={s.SignUpForm} onSubmit={handleSubmit(onSubmit)}>
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
        <ControlInput
          control={control}
          errorMessage={errors.confirm?.message}
          label={'Confirm password'}
          name={'confirm'}
          type={'password'}
        />
        <Button className={s.SignUpFormButton} fullWidth type={'submit'}>
          Sign Up
        </Button>
      </form>
      <Typography as={'p'} className={s.SignUpText} variant={'body-2'}>
        Already have an account?
      </Typography>
      <Button as={Link} className={s.SignUpLoginLink} to={'/login'} variant={'link'}>
        Sign In
      </Button>
    </Card>
  )
}
