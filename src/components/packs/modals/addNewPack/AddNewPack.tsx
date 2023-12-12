import React, { RefObject, useState } from 'react'
import { useForm } from 'react-hook-form'

import { IconImage } from '@/assets/icons/IconImage'
import { Button } from '@/components/ui/button'
import { ControlledCheckbox } from '@/components/ui/controlled/controlCheckbox'
import { ControlInput } from '@/components/ui/controlled/controlInput'
import { Input } from '@/components/ui/input'
import { Typography } from '@/components/ui/typography'
import { useCreateDeckMutation } from '@/services/decks'
import { decksActions } from '@/services/decks/decks.slice'
import { useAppDispatch } from '@/services/store'

import s from './AddNewPack.module.scss'

type FormValue = {
  cover: File | null
  name: string
  private: boolean
}
type Props = {
  closeRef: RefObject<HTMLButtonElement>
}

export const AddNewPack = ({ closeRef }: Props) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const [selectedImage, setSelectedImage] = useState('')
  const { control, getValues, handleSubmit, setValue } = useForm<FormValue>({
    defaultValues: {
      cover: null,
      name: '',
      private: false,
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })
  const dispatch = useAppDispatch()

  const [createDeck, isFetching] = useCreateDeckMutation()

  const onSubmit = (data: FormValue) => {
    const cover = getValues('cover')
    const formData = new FormData()

    if (cover) {
      formData.append('cover', cover)
    }
    formData.append('name', data.name)
    formData.append('isPrivate', data.private.toString())

    createDeck(formData)
    dispatch(decksActions.setCurrentPage({ currentPage: 1 }))

    if (closeRef.current) {
      closeRef.current.click()
    }
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
    if (closeRef.current) {
      closeRef.current.click()
    }
  }

  return (
    <div className={s.container}>
      <div className={s.header}>
        <Typography as={'p'} variant={'H2'}>
          Add New Pack
        </Typography>
      </div>
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
          <ControlInput control={control} name={'name'} />
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
