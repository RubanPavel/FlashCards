import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { Button } from '@//components/ui/button'
import { registerPageData } from '@/assets/variable'
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
import { clsx } from 'clsx'
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
  className?: string
  handleRegister: (formData: FormValues) => void
}

export const SignUp = ({ className, handleRegister }: Props) => {
  const { button, info, inputs, link, title } = registerPageData.signUp
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

  const onSubmit = (formData: FormValues) => {
    handleRegister(formData)
  }

  return (
    <Card className={clsx(s.SignUpRoot, className)}>
      <Typography as={'h1'} className={s.SignUpHeader} variant={'large'}>
        {title}
      </Typography>
      <form className={s.SignUpForm} onSubmit={handleSubmit(onSubmit)}>
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
        <ControlInput
          control={control}
          errorMessage={errors.confirm?.message}
          label={inputs.confirmPassword}
          name={'confirm'}
          type={'password'}
        />
        <Button className={s.SignUpFormButton} fullWidth type={'submit'}>
          {button}
        </Button>
      </form>
      <Typography as={'p'} className={s.SignUpText} variant={'body-2'}>
        {info}
      </Typography>
      <Button as={Link} className={s.SignUpLoginLink} to={'/login'} variant={'link'}>
        {link}
      </Button>
    </Card>
  )
}
