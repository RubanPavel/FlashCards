import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import { IconImage } from '@/assets/icons/IconImage'
import { Button } from '@/components/ui/button'
import { ControlledCheckbox } from '@/components/ui/controlled/controlCheckbox'
import { ControlInput } from '@/components/ui/controlled/controlInput'
import { Input } from '@/components/ui/input'
import { Typography } from '@/components/ui/typography'

import s from './AddNewPack.module.scss'

type FormValue = {
  cover: {}
  name: string
  private: boolean
}

export const AddNewPack = () => {
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const [selectedImage, setSelectedImage] = useState('')
  const { control, handleSubmit, setValue } = useForm<FormValue>({
    defaultValues: {
      cover: {},
      name: '',
      private: false,
    },
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  })

  const onSubmit = (data: any) => {
    return data
  }

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      const imageUrl = URL.createObjectURL(file)

      setSelectedImage(imageUrl)
      const formData = new FormData()

      formData.append('image', file)
      setValue('cover', formData)
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
            <Button type={'button'}>
              <Typography as={'p'} variant={'subtitle-2'}>
                Cancel
              </Typography>
            </Button>
            <Button>
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
