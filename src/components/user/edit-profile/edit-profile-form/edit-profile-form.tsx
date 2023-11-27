import { ComponentPropsWithoutRef } from 'react'
import {Controller, useForm} from 'react-hook-form'
import {avatarSchema, emailSchema, nicknameSchema, searchSchema} from '@/components/auth/validate/validate'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import s from './edit-pfofile-form.module.scss'
import {Input} from "@/components/ui/input";
import {ControlInput} from "@/components/ui/controlled/controlInput";
import {User} from "@/assets/userDataForTest";
import {formFieldsVariant} from "@/components/user/edit-profile";

export const editEditProfileSchema = z.object({
  avatar: avatarSchema,
  nickname: nicknameSchema,
  email: emailSchema,
  search: searchSchema
})

type FormValues = z.infer<typeof editEditProfileSchema>

export type Variant = typeof formFieldsVariant[keyof typeof formFieldsVariant]

type Props = {
    variant: Variant
  onCancel: () => void
} & ComponentPropsWithoutRef<'form'>

export const EditProfileForm = ({ variant, onCancel }: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
      avatar: undefined,
      nickname: User.name,
      email: User.email,
      search: '',
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
        {(variant === formFieldsVariant.avatar) && <Controller
          name={"avatar"}
          control={control}
          render={({ field }) => (
              <Input
                  type="file"
                  name={"avatar"}
                  onChange={(e) => field.onChange(e.target.files)}
                  errorMessage={errors.avatar?.message}
                  label={'Avatar'}
                  accept="image/jpeg, image/jpg, image/png, image/webp"
                  size={5*1024*1024}
              />
          )}
      />}
        {(variant === formFieldsVariant.nickname) && <ControlInput
        control={control}
        errorMessage={errors.nickname?.message}
        label={'Nickname'}
        name={'nickname'}
        type={'text'}
      />
        }
        {(variant === formFieldsVariant.email) && <ControlInput
          control={control}
          errorMessage={errors.email?.message}
          label={'Email'}
          name={'email'}
          type={'text'}
        />
        }
      <ControlInput
          control={control}
          errorMessage={errors.search?.message}
          label={'Search'}
          name={'search'}
          type={'search'}
          setValue={setValue}
      />
      <Button fullWidth type={'submit'}>
        Save Changes
      </Button>
    </form>
  )
}
