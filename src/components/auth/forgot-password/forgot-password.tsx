import { useForm } from 'react-hook-form'

import { Button } from '@//components/ui/button'
import { Card } from '@/components/ui/card'
import { ControlInput } from '@/components/ui/controlled/controlInput'
import { Typography } from '@/components/ui/typography'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './forgot-password.module.scss'

const loginSchema = z.object({
  email: z.string().email(),
})

type FormValues = z.infer<typeof loginSchema>
type Props = {
  onHandleChange: (value: boolean) => void
  onSubmitValue: (data: FormValues) => void
}

export const ForgotPassword = ({ onHandleChange, onSubmitValue }: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
    },
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
          control={control}
          errorMessage={errors.email?.message}
          label={'email'}
          name={'email'}
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
          onClick={() => onHandleChange(true)}
          variant={'subtitle-1'}
        >
          Try logging in
        </Typography>
      </form>
    </Card>
  )
}
