import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import { IconImage } from '@/assets/icons/IconImage'
import { answerSchema, photoSchema, questionSchema } from '@/components/auth/validate/validate'
import { Button } from '@/components/ui/button'
import { ControlInput } from '@/components/ui/controlled/controlInput'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Typography } from '@/components/ui/typography'
import { useCreateCardMutation } from '@/services/decks'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './AddNewCard.module.scss'

type Props = {
  id?: string
  onClose?: (val: boolean) => void
}

const inputSchema = z.object({
  answer: answerSchema,
  answerImg: photoSchema,
  question: questionSchema,
  questionImg: photoSchema,
})

type FormValue = z.infer<typeof inputSchema>

export function AddNewCard({ id, onClose }: Props) {
  const [selectedQuesImage, setSelectedQuesImage] = useState('')
  const [selectedAnsImage, setSelectedAnsImage] = useState('')
  const [currentOption, setCurrentOption] = useState<string>('Text')
  const inputQuesRef = React.useRef<HTMLInputElement | null>(null)
  const inputAnsRef = React.useRef<HTMLInputElement | null>(null)

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<FormValue>({
    defaultValues: {
      answer: '',
      answerImg: undefined,
      question: '',
      questionImg: undefined,
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: zodResolver(inputSchema),
  })

  const selectOption = [
    {
      value: 'Text',
    },
    {
      value: 'Picture',
    },
  ]

  const [creatCard, {}] = useCreateCardMutation()

  const onSubmit = (data: FormValue) => {
    const formData = new FormData()

    id && formData.append('id', id)
    formData.append('question', data.question)
    formData.append('answer', data.answer)
    data.questionImg && formData.append('questionImg', data.questionImg)
    data.answerImg && formData.append('answerImg', data.answerImg)

    creatCard(formData)

    if (onClose) {
      onClose(false)
    }
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      const imageUrl = URL.createObjectURL(file)

      if (e.target.name === 'questionImg') {
        setSelectedQuesImage(imageUrl)
        setValue('questionImg', file)
      }
      if (e.target.name === 'answerImg') {
        setSelectedAnsImage(imageUrl)
        setValue('answerImg', file)
      }
    }
  }

  const handleButtonClick = (e: any) => {
    if (inputQuesRef.current) {
      e.currentTarget.name === 'question' && inputQuesRef.current.click()
    }

    if (inputAnsRef.current) {
      e.currentTarget.name === 'answer' && inputAnsRef.current.click()
    }
  }

  const onCloseClick = () => {
    if (onClose) {
      onClose(false)
    }
  }

  return (
    <div>
      <div className={s.content}>
        <Select
          className={s.selectFormat}
          label={'Choose a question format'}
          onValueChange={val => setCurrentOption(val)}
          selectOptions={selectOption}
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          {currentOption === 'Text' && (
            <>
              <ControlInput
                control={control}
                errorMessage={errors.question?.message}
                label={'Question'}
                name={'question'}
              />
              <ControlInput
                control={control}
                errorMessage={errors.answer?.message}
                label={'Answer'}
                name={'answer'}
              />
            </>
          )}
          {currentOption === 'Picture' && (
            <>
              <div className={s.questionImg}>
                {selectedQuesImage ? (
                  <img alt={'image'} className={s.image} src={selectedQuesImage} />
                ) : (
                  <Typography variant={'H3'}>No Image</Typography>
                )}
                <div>
                  <Input
                    accept={'image/jpeg, image/jpg, image/png, image/webp'}
                    className={s.cardImage}
                    name={'questionImg'}
                    onChange={onFileChange}
                    ref={inputQuesRef}
                    type={'file'}
                  />
                  <Button
                    name={'question'}
                    onClick={handleButtonClick}
                    type={'button'}
                    variant={'secondary'}
                  >
                    <IconImage />
                    <Typography variant={'subtitle-2'}>Change Cover</Typography>
                  </Button>
                </div>
              </div>

              <div className={s.answerImg}>
                {selectedAnsImage ? (
                  <img alt={'image'} className={s.image} src={selectedAnsImage} />
                ) : (
                  <Typography variant={'H3'}>No Image</Typography>
                )}
                <div>
                  <Input
                    accept={'image/jpeg, image/jpg, image/png, image/webp'}
                    className={s.cardImage}
                    name={'answerImg'}
                    onChange={onFileChange}
                    ref={inputAnsRef}
                    type={'file'}
                  />
                  <Button
                    name={'answer'}
                    onClick={handleButtonClick}
                    type={'button'}
                    variant={'secondary'}
                  >
                    <IconImage />
                    <Typography variant={'subtitle-2'}>Change Cover</Typography>
                  </Button>
                </div>
              </div>
            </>
          )}
          <div className={s.footer}>
            <Button onClick={onCloseClick} type={'button'}>
              <Typography as={'p'} variant={'subtitle-2'}>
                Cancel
              </Typography>
            </Button>
            <Button>
              <Typography as={'p'} variant={'subtitle-2'}>
                Add New Card
              </Typography>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
