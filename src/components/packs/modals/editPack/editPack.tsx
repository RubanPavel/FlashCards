import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { IconImage } from '@/assets/icons/IconImage'
import { optionsToast, packsPageData } from '@/assets/variable'
import { namePackSchema, photoSchema, rememberMe } from '@/components/auth/validate/validate'
import { Button } from '@/components/ui/button'
import { ControlledCheckbox } from '@/components/ui/controlled/controlCheckbox'
import { ControlInput } from '@/components/ui/controlled/controlInput'
import { Input } from '@/components/ui/input'
import { Typography } from '@/components/ui/typography'
import { UpdateDeckRequest, useUpdateDeckMutation } from '@/services/decks'
import { decksActions } from '@/services/decks/decks.slice'
import { useAppDispatch } from '@/services/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './editPack.module.scss'

const schemaEdit = z.object({
  cover: photoSchema,
  isPrivate: rememberMe,
  name: namePackSchema,
})

type FormValue = z.infer<typeof schemaEdit>

type Props = {
  deck?: UpdateDeckRequest
  onClose?: (val: boolean) => void
}

export const EditPack = ({ deck, onClose }: Props) => {
  const { cancelButton, imageButton, imageInfo, imageSpan, inputLabel, isPrivate, saveButton } =
    packsPageData.modals.editPack
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const [selectedImage, setSelectedImage] = useState<File | string>()

  useEffect(() => {
    setSelectedImage(deck?.cover)
  }, [deck?.cover])

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<FormValue>({
    defaultValues: {
      cover: undefined,
      isPrivate: deck?.isPrivate,
      name: deck?.name || '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: zodResolver(schemaEdit),
  })
  const dispatch = useAppDispatch()

  const [updateDeck, isFetching] = useUpdateDeckMutation()

  const onSubmit: SubmitHandler<FormValue> = data => {
    updateDeck({
      cover: data.cover,
      id: deck?.id,
      isPrivate: data.isPrivate,
      name: data.name,
    })
      .unwrap()
      .then(() => {
        toast.success(`Your deck updated successfully`, optionsToast)
      })
      .catch(() => {
        toast.error('Deck not found', optionsToast)
      })
    dispatch(decksActions.setCurrentPage({ currentPage: 1 }))
    if (onClose) {
      isFetching && onClose(false)
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
                <img alt={'image'} className={s.image} src={selectedImage.toString()} />
              ) : (
                <span>{imageSpan}</span>
              )}
            </div>
            <div className={s.infoWrap}>
              <div style={{ textAlign: 'center' }}>
                <Typography as={'p'} variant={'H3'}>
                  {imageInfo}
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
                  <Typography variant={'subtitle-2'}>{imageButton}</Typography>
                </Button>
              </div>
            </div>
          </div>
          <Typography as={'label'} variant={'body-2'}>
            {inputLabel}
          </Typography>
          <ControlInput control={control} errorMessage={errors.name?.message} name={'name'} />
          <div style={{ alignItems: 'center', display: 'flex' }}>
            <ControlledCheckbox control={control} name={'isPrivate'} />
            <Typography variant={'body-2'}>{isPrivate}</Typography>
          </div>
          <div className={s.footer}>
            <Button onClick={onCloseClick} type={'button'}>
              <Typography as={'p'} variant={'subtitle-2'}>
                {cancelButton}
              </Typography>
            </Button>
            <Button disabled={!isFetching}>
              <Typography as={'p'} variant={'subtitle-2'}>
                {saveButton}
              </Typography>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
