import { ComponentPropsWithoutRef } from 'react'
import { useForm } from 'react-hook-form'

import { User } from '@/assets/userDataForTest'
import { nicknameSchema } from '@/components/auth/validate/validate'
import { Button } from '@/components/ui/button'
import { ControlInput } from '@/components/ui/controlled/controlInput'
import { Variant } from '@/components/user/edit-profile/edit-profile'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './edit-pfofile-form.module.scss'

export const editNicknameSchema = z.object({
  Nickname: nicknameSchema,
})

export const editAvatarSchema = z.object({
  Avatar: nicknameSchema,
})

type FormValue = z.infer<typeof editAvatarSchema | typeof editNicknameSchema>

type Props = {
  onCancel: () => void
  variant: Variant
} & ComponentPropsWithoutRef<'form'>

export const EditProfileForm = ({ onCancel, variant }: Props) => {
  const defaultValue = variant === 'Nickname' ? User.name : User.avatar
  const zodResolverSchema = variant === 'Nickname' ? editNicknameSchema : editAvatarSchema

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValue>({
    defaultValues: {
      [variant]: defaultValue,
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: zodResolver(zodResolverSchema),
  })

  // TODO
  const onSubmit = (data: FormValue) => {
    onCancel()

    return data
  }

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <ControlInput
        control={control}
        errorMessage={errors[variant as keyof typeof errors]?.message}
        label={variant}
        name={variant}
      />
      <Button fullWidth type={'submit'}>
        Save Changes
      </Button>
    </form>
  )
}
