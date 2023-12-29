import { ComponentPropsWithoutRef } from 'react'
import { useForm } from 'react-hook-form'

import { nicknameSchema } from '@/components/auth/validate/validate'
import { Button } from '@/components/ui/button'
import { ControlInput } from '@/components/ui/controlled/controlInput'
import { AuthResponse, UpdateUser } from '@/services/auth'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './pfofile-form.module.scss'
import { profilePageData } from '@/assets/variable'

export const editEditProfileSchema = z.object({
  nickname: nicknameSchema,
})

type FormValues = z.infer<typeof editEditProfileSchema>

type Props = {
  user: AuthResponse | undefined
  handleCancelEdit: () => void
  handleUpdateUser: (formData: UpdateUser) => void
} & ComponentPropsWithoutRef<'form'>

export const ProfileForm = ({ user, handleCancelEdit, handleUpdateUser }: Props) => {
  const { input, button } = profilePageData.profile.profileForm
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      nickname: user?.name || '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: zodResolver(editEditProfileSchema),
  })

  const onSubmit = (updatedData: FormValues) => {
    handleUpdateUser({ name: updatedData.nickname })
    handleCancelEdit()
  }

  return (
    <form className={s.EditProfileFormRoot} onSubmit={handleSubmit(onSubmit)}>
      <DevTool control={control} />
      <ControlInput
        control={control}
        errorMessage={errors.nickname?.message}
        label={input}
        name={'nickname'}
        type={'text'}
      />
      <Button fullWidth type={'submit'}>
        {button}
      </Button>
    </form>
  )
}
