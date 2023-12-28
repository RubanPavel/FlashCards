import { ComponentPropsWithoutRef } from 'react'
import { useForm } from 'react-hook-form'

import { User } from '@/assets/userDataForTest'
import { nicknameSchema } from '@/components/auth/validate/validate'
import { Button } from '@/components/ui/button'
import { ControlInput } from '@/components/ui/controlled/controlInput'
import { UpdateUser } from '@/services/auth'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './pfofile-form.module.scss'

export const editEditProfileSchema = z.object({
  nickname: nicknameSchema,
})

type FormValues = z.infer<typeof editEditProfileSchema>

type Props = {
  handleCancelEdit: () => void
  handleUpdateUser: (formData: UpdateUser) => void
} & ComponentPropsWithoutRef<'form'>

export const ProfileForm = ({ handleCancelEdit, handleUpdateUser }: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      nickname: User.name,
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: zodResolver(editEditProfileSchema),
  })

  // TODO
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
        label={'Nickname'}
        name={'nickname'}
        type={'text'}
      />
      <Button fullWidth type={'submit'}>
        Save Changes
      </Button>
    </form>
  )
}
