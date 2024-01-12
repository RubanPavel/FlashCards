import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import { IconImage } from '@/assets/icons/IconImage'
import { namePackSchema, photoSchema, rememberMe } from '@/components/auth/validate/validate'
import { Button } from '@/components/ui/button'
import { ControlledCheckbox } from '@/components/ui/controlled/controlCheckbox'
import { ControlInput } from '@/components/ui/controlled/controlInput'
import { Input } from '@/components/ui/input'
import { Typography } from '@/components/ui/typography'
import { useCreateDeckMutation } from '@/services/decks'
import { decksActions } from '@/services/decks/decks.slice'
import { useAppDispatch } from '@/services/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from '@/components/packs/modals/editPack/addNewPack/AddNewPack.module.scss'

const schema = z.object({
  cover: photoSchema,
  name: namePackSchema,
  private: rememberMe,
})

type FormValue = z.infer<typeof schema>

type Props = {
  onClose?: (val: boolean) => void
}

export const AddNewPack = ({ onClose }: Props) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const [selectedImage, setSelectedImage] = useState('')
  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    setValue,
  } = useForm<FormValue>({
    defaultValues: {
      cover: undefined,
      name: '',
      private: false,
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: zodResolver(schema),
  })
  const dispatch = useAppDispatch()

  const [isFetching] = useCreateDeckMutation()

  const onSubmit = (values: FormValue) => {
    const cover = getValues('cover')
    const formData = new FormData()

    if (cover) {
      formData.append('cover', cover)
    }
    formData.append('name', values.name)
    formData.append('isPrivate', values.private ? values.private.toString() : '')

    // createDeck(formData)
    dispatch(decksActions.setCurrentPage({ currentPage: 1 }))
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      const imageUrl = URL.createObjectURL(file)

      setSelectedImage(imageUrl)

      setValue('cover', file)
    }
  }

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  const onCloseClick = () => {
    if (onClose) {
      onClose(false)
    }
  }

  return (
    <div className={s.container}>
      <div className={s.content}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={s.item}>
            <div className={s.imageWrap}>
              {selectedImage ? (
                <img alt={'image'} className={s.image} src={selectedImage} />
              ) : (
                <span>No Image</span>
              )}
            </div>
            <div className={s.infoWrap}>
              <div style={{ textAlign: 'center' }}>
                <Typography as={'p'} variant={'H3'}>
                  Cover
                </Typography>
                <Input
                  accept={'image/jpeg, image/jpg, image/png, image/webp'}
                  className={s.cover}
                  name={'cover'}
                  onChange={onFileChange}
                  ref={inputRef}
                  type={'file'}
                />
                <Button onClick={handleButtonClick} type={'button'} variant={'secondary'}>
                  <IconImage />
                  <Typography variant={'subtitle-2'}>Change Cover</Typography>
                </Button>
              </div>
            </div>
          </div>
          <Typography as={'p'} variant={'body-2'}>
            Name Pack
          </Typography>
          <ControlInput control={control} errorMessage={errors.name?.message} name={'name'} />
          <div style={{ alignItems: 'center', display: 'flex' }}>
            <ControlledCheckbox control={control} name={'private'} />
            <Typography variant={'body-2'}>Private Pack</Typography>
          </div>
          <div className={s.footer}>
            <Button onClick={onCloseClick} type={'button'}>
              <Typography as={'p'} variant={'subtitle-2'}>
                Cancel
              </Typography>
            </Button>
            <Button disabled={!isFetching}>
              <Typography as={'p'} variant={'subtitle-2'}>
                Add New Pack
              </Typography>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
