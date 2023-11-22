import {useForm} from 'react-hook-form'
import {z} from 'zod'

import {Button} from '../../ui/button'
import {zodResolver} from "@hookform/resolvers/zod";
import {ControlledCheckbox} from "@/components/ui/controlled/controlCheckbox";
import {ControlInput} from "@/components/ui/controlled/controlInput";


const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  rememberMe: z.boolean().default(false),
})

type FormValues = z.infer<typeof loginSchema>

export const LoginForm = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: {errors},
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
        label={'email'}
        control={control}
        errorMessage={errors.email?.message}
      />
      <ControlInput
        {...register('password')}
        label={'password'}
        control={control}
        errorMessage={errors.password?.message}
      />
      <ControlledCheckbox name={'rememberMe'} title={'remember me'} control={control}/>
      <Button type="submit">Submit</Button>
    </form>
  )
}