import { useForm } from 'react-hook-form'

import { Button } from '@//components/ui/button'
import { Card } from '@/components/ui/card'
import { ControlInput } from '@/components/ui/controlled/controlInput'
import { Typography } from '@/components/ui/typography'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './createPassword.module.scss'

const createPasswordSchema = z.object({
  password: z.string().min(3, { message: 'Password must contain at least 3 characters' }),
})

type FormValues = z.infer<typeof createPasswordSchema>

export const CreatePassword = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      password: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: zodResolver(createPasswordSchema),
  })

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <Card className={s.createWrapper}>
      <Typography className={s.title} variant={'large'}>
        Create new password
      </Typography>
      <form className={s.formWrapper} onSubmit={handleSubmit(onSubmit)}>
        <DevTool control={control} />
        <ControlInput
          control={control}
          errorMessage={errors.password?.message}
          label={'Password'}
          name={'password'}
          type={'password'}
        />
        <Typography as={'p'} className={s.info} variant={'body-2'}>
          Create new password and we will send you further instructions to email
        </Typography>
        <Button className={s.buttonSubmit} fullWidth type={'submit'}>
          Create New Password
        </Button>
      </form>
    </Card>
  )
}
