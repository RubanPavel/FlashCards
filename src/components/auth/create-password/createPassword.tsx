import { useForm } from 'react-hook-form'

import { Button } from '@//components/ui/button'
import { passwordSchema } from '@/components/auth/validate/validate'
import { Card } from '@/components/ui/card'
import { ControlInput } from '@/components/ui/controlled/controlInput'
import { Typography } from '@/components/ui/typography'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'
import { z } from 'zod'

import s from './createPassword.module.scss'

const createPasswordSchema = z.object({
  password: passwordSchema,
})

export type FormValues = z.infer<typeof createPasswordSchema>

type Props = {
  className?: string
  handleCreatePassword: (formData: FormValues) => void
}

export const CreatePassword = ({ className, handleCreatePassword }: Props) => {
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
    handleCreatePassword(data)
  }

  return (
    <Card className={clsx(s.wrapperCreatePassword, className)}>
      <Typography as={'h1'} className={s.titleCreatePassword} variant={'large'}>
        Create new password
      </Typography>
      <form className={s.formCreatePassword} onSubmit={handleSubmit(onSubmit)}>
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
        <Button className={s.submitCreatePassword} fullWidth type={'submit'}>
          Create New Password
        </Button>
      </form>
    </Card>
  )
}
