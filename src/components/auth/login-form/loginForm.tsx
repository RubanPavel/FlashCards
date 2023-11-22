import { useForm } from 'react-hook-form'

import { Button } from '@//components/ui/button'
import { ControlledCheckbox } from '@/components/ui/controlled/controlCheckbox'
import { ControlInput } from '@/components/ui/controlled/controlInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  rememberMe: z.boolean().default(false),
})

type FormValues = z.infer<typeof loginSchema>

export const LoginForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      />
      <ControlledCheckbox control={control} name={'rememberMe'} title={'remember me'} />
      <Button type={'submit'}>Submit</Button>
    </form>
  )
}
