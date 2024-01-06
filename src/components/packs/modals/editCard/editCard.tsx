import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { IconImage } from '@/assets/icons/IconImage'
import { answerSchema, questionSchema } from '@/components/auth/validate/validate'
import { Button } from '@/components/ui/button'
import { ControlInput } from '@/components/ui/controlled/controlInput'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Typography } from '@/components/ui/typography'
import { useUpdateCardMutation } from '@/services/cards'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './editCard.module.scss'

type Props = {
  card: any
  onClose?: (val: boolean) => void
}

const inputSchema = z.object({
  answer: answerSchema,
  answerImg: z.any(),
  question: questionSchema,
  questionImg: z.any(),
})

type FormValue = z.infer<typeof inputSchema>

export function EditCard({ card, onClose }: Props) {
  const [selectedQuesImage, setSelectedQuesImage] = useState('')
  const [selectedAnsImage, setSelectedAnsImage] = useState('')
  const [currentOption, setCurrentOption] = useState<string>('Text')
  const inputQuesRef = React.useRef<HTMLInputElement | null>(null)
  const inputAnsRef = React.useRef<HTMLInputElement | null>(null)
  /*const { data: dataCard } = useGetCardsByIdQuery(card.id)*/
  const [editCard] = useUpdateCardMutation()

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<FormValue>({
    defaultValues: {
      answer: card.answer || '',
      answerImg: undefined,
      question: card?.question || '',
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

  const onSubmit: SubmitHandler<FormValue> = data => {
    editCard({
      answer: data.answer,
      answerImg: undefined,
      /*answerImg: data.answerImg[0],*/
      answerVideo: '',
      id: card.id,
      question: data.question,
      /*questionImg: data.questionImg[0],*/
      questionVideo: '',
    })
      .unwrap()
      .then(() => {
        toast.success(`Your card updated successfully`)
      })
      .catch(e => {
        toast.error(e.data.message)
      })

    if (onClose) {
      onClose(false)
      reset()
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
      reset()
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
                Save Changes
              </Typography>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
