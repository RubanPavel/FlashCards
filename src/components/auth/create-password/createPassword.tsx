import { useForm } from 'react-hook-form'

import { Button } from '@//components/ui/button'
import { createPasswordPageData } from '@/assets/variable'
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
  const { button, info, inputs, title } = createPasswordPageData.createPassword
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
    <Card className={clsx(s.CreatePasswordWrapper, className)}>
      <Typography as={'h1'} className={s.CreatePasswordTitle} variant={'large'}>
        {title}
      </Typography>
      <form className={s.CreatePasswordForm} onSubmit={handleSubmit(onSubmit)}>
        <DevTool control={control} />
        <ControlInput
          control={control}
          errorMessage={errors.password?.message}
          label={inputs.password}
          name={'password'}
          type={'password'}
        />
        <Typography as={'p'} className={s.CreatePasswordInfo} variant={'body-2'}>
          {info}
        </Typography>
        <Button className={s.CreatePasswordSubmit} fullWidth type={'submit'}>
          {button}
        </Button>
      </form>
    </Card>
  )
}
