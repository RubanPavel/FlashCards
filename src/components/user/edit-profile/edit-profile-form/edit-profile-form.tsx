import { ComponentPropsWithoutRef } from 'react'
import {Controller, useForm} from 'react-hook-form'
import {avatarSchema, emailSchema, nicknameSchema} from '@/components/auth/validate/validate'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import s from './edit-pfofile-form.module.scss'
import {Input} from "@/components/ui/input";
import {ControlInput} from "@/components/ui/controlled/controlInput";
import {User} from "@/assets/userDataForTest";

export const editEditProfileSchema = z.object({
  avatar: avatarSchema,
  nickname: nicknameSchema,
  email: emailSchema,
})

type FormValues = z.infer<typeof editEditProfileSchema>

type Props = {
  onCancel: () => void
} & ComponentPropsWithoutRef<'form'>

export const EditProfileForm = ({ onCancel }: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      avatar: undefined,
      nickname: User.name,
      email: User.email,
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: zodResolver(editEditProfileSchema),
  })

  // TODO
  const onSubmit = (data: FormValues) => {
    console.log(data)
    onCancel()
  }

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <Controller
          name={'avatar'}
          control={control}
          render={({ field }) => (
              <Input
                  type="file"
                  onChange={(e) => field.onChange(e.target.files)}
                  errorMessage={errors.avatar?.message}
                  label={'Avatar'}
              />
          )}
      />
      <ControlInput
        control={control}
        errorMessage={errors.nickname?.message}
        label={'Nickname'}
        name={'nickname'}
        type={'text'}
      />
      <ControlInput
          control={control}
          errorMessage={errors.email?.message}
          label={'Email'}
          name={'email'}
          type={'text'}
      />
      <Button fullWidth type={'submit'}>
        Save Changes
      </Button>
    </form>
  )
}
