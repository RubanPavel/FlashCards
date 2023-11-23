import { useForm } from 'react-hook-form'

import { Button } from '@//components/ui/button'
import { ControlledCheckbox } from '@/components/ui/controlled/controlCheckbox'
import { ControlInput } from '@/components/ui/controlled/controlInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import s from './sign-in.module.scss'
import {DevTool} from "@hookform/devtools";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  rememberMe: z.boolean().default(false),
})

type FormValues = z.infer<typeof loginSchema>
type Props = {
  onSubmitValue: (data: FormValues) => void
  onHandleChange: (value: boolean) => void
}

export const SignIn = ({ onSubmitValue, onHandleChange }: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: FormValues) => {
    onSubmitValue(data)
  }

  return (
    <Card className={s.wrapperSignIn}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DevTool control={control} />
        <Typography as={'div'} className={s.textSignIn} variant={'large'}>
          Sign In
        </Typography>
        <ControlInput
          {...register('email')}
          control={control}
          errorMessage={errors.email?.message}
          label={'email'}
        />
        <ControlInput
          {...register('password')}
          control={control}
          errorMessage={errors.password?.message}
          label={'password'}
          type={'password'}
        />
        <ControlledCheckbox control={control} name={'rememberMe'} title={'remember me'} />
        <Typography
          as={'div'}
          className={s.forgotPassword}
          variant={'body-2'}
          onClick={() => onHandleChange(true)}
        >
          Forgot Password?
        </Typography>
        <Button fullWidth type={'submit'}>
          Sign In
        </Button>
        <Typography as={'div'} className={s.dontAccount} variant={'body-2'}>
          Don't have an account?
        </Typography>
        <Typography
          as={'div'}
          className={s.signUp}
          variant={'subtitle-1'}
          onClick={() => onHandleChange(true)}
        >
          Sign Up
        </Typography>
      </form>
    </Card>
  )
}
