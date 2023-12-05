import { ComponentPropsWithoutRef } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { User } from '@/assets/userDataForTest'
import { avatarSchema, emailSchema, nicknameSchema } from '@/components/auth/validate/validate'
import { Button } from '@/components/ui/button'
import { ControlInput } from '@/components/ui/controlled/controlInput'
import { Input } from '@/components/ui/input'
import { formFieldsVariant } from '@/components/user/my-profile'
import { useUpdateUserMutation } from '@/services/auth'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './edit-pfofile-form.module.scss'

export const editEditProfileSchema = z.object({
  avatar: avatarSchema,
  email: emailSchema,
  nickname: nicknameSchema,
})

type FormValues = z.infer<typeof editEditProfileSchema>

export type Variant = (typeof formFieldsVariant)[keyof typeof formFieldsVariant]

type Props = {
  onCancel: () => void
  variant: Variant
} & ComponentPropsWithoutRef<'form'>

export const EditProfileForm = ({ onCancel, variant }: Props) => {
  const [updateUser] = useUpdateUserMutation()
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      avatar: undefined,
      email: User.email,
      nickname: User.name,
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: zodResolver(editEditProfileSchema),
  })

  // TODO
  const onSubmit = (updatedData: FormValues) => {
    const payload = new FormData()

    if (updatedData.nickname) {
      payload.append('name', 'testUser')
    }

    if (updatedData.avatar) {
      payload.append('avatar', updatedData.avatar[0])
    }

    if (updatedData.email) {
      payload.append('email', updatedData.email)
    }

    updateUser(payload)
    onCancel()
  }

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <DevTool control={control} />
      {variant === formFieldsVariant.avatar && (
        <Controller
          control={control}
          name={'avatar'}
          render={({ field }) => (
            // TODO поправить ограничения по аватару
            <Input
              accept={'image/jpeg, image/jpg, image/png, image/webp'}
              errorMessage={errors.avatar?.message}
              label={'Avatar'}
              name={'avatar'}
              onChange={e => field.onChange(e.target.files)}
              size={5 * 1024 * 1024}
              type={'file'}
            />
          )}
        />
      )}
      {variant === formFieldsVariant.nickname && (
        <ControlInput
          control={control}
          errorMessage={errors.nickname?.message}
          label={'Nickname'}
          name={'nickname'}
          type={'text'}
        />
      )}
      {variant === formFieldsVariant.email && (
        <ControlInput
          control={control}
          errorMessage={errors.email?.message}
          label={'Email'}
          name={'email'}
          type={'text'}
        />
      )}
      <Button fullWidth type={'submit'}>
        Save Changes
      </Button>
    </form>
  )
}
