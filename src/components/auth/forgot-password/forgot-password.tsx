import { useForm } from 'react-hook-form'

import { Button } from '@//components/ui/button'
import { ControlInput } from '@/components/ui/controlled/controlInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import s from './forgot-password.module.scss'
import {DevTool} from "@hookform/devtools";

const loginSchema = z.object({
  email: z.string().email(),
})

type FormValues = z.infer<typeof loginSchema>
type Props = {
  onSubmitValue: (data: FormValues) => void
  onHandleChange: (value: boolean) => void
}

export const ForgotPassword = ({ onSubmitValue, onHandleChange }: Props) => {
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
    <Card className={s.wrapperForgot}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DevTool control={control} />
        <Typography as={'div'} className={s.textForgot} variant={'large'}>
          Forgot your password?
        </Typography>
        <ControlInput
          {...register('email')}
          control={control}
          errorMessage={errors.email?.message}
          label={'email'}
        />
        <Typography as={'div'} className={s.textEmailAddress} variant={'body-2'}>
          Enter your email address and we will send you further instructions
        </Typography>
        <Button fullWidth type={'submit'}>
          Send instructions
        </Button>
        <Typography as={'div'} className={s.textAskOfPassword} variant={'body-2'}>
          Did you remember your password?
        </Typography>
        <Typography
          as={'div'}
          className={s.textTry}
          variant={'subtitle-1'}
          onClick={() => onHandleChange(true)}
        >
          Try logging in
        </Typography>
      </form>
    </Card>
  )
}
