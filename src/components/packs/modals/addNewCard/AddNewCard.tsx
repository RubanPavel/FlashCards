import s from './AddNewCard.module.scss'
import {Typography} from "@/components/ui/typography";
import {useForm} from "react-hook-form";
import {Select} from "@/components/ui/select";
import React, {RefObject, useState} from "react";
import {ControlInput} from "@/components/ui/controlled/controlInput";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {IconImage} from "@/assets/icons/IconImage";
import {z} from "zod";
import {answerSchema, photoSchema, questionSchema} from "@/components/auth/validate/validate";
import {zodResolver} from "@hookform/resolvers/zod";

type Props = {
  id: string
  closeRef: RefObject<HTMLButtonElement>
}

const inputSchema = z.object({
  questionTxt: questionSchema,
  answerTxt: answerSchema,
  questionImg: photoSchema,
  answerImg: photoSchema
})

type FormValue = z.infer<typeof inputSchema>

export function AddNewCard({ closeRef }: Props) {
  const [selectedQuesImage, setSelectedQuesImage] = useState('')
  const [selectedAnsImage, setSelectedAnsImage] = useState('')
  const [currentOption, setCurrentOption] = useState<string>('Text')
  const inputQuesRef = React.useRef<HTMLInputElement | null>(null)
  const inputAnsRef = React.useRef<HTMLInputElement | null>(null)

  const {control, handleSubmit, setValue} = useForm<FormValue>({
    defaultValues: {
      questionTxt: '',
      answerTxt: '',
      questionImg: undefined,
      answerImg: undefined
    },
    mode: 'onBlur',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(inputSchema)
  })

  const selectOption = [
    {
      value: 'Text',
    },
    {
      value: 'Picture',
    },
  ]

  const onSubmit = (data: FormValue) => {
    const formData = new FormData()

    formData.append('questionTxt', data.questionTxt)
    formData.append('answerTxt', data.answerTxt)
    data.questionImg && formData.append('questionImg', data.questionImg)
    data.answerImg && formData.append('answerImg', data.answerImg)


    if (closeRef.current) {
      closeRef.current.click()
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
    if (closeRef.current) {
      closeRef.current.click()
    }
  }

  return (
    <div>
      <div className={s.header}>
        <Typography as={'p'} variant={'H2'}>
          Add New Card
        </Typography>
      </div>
      <div className={s.content}>
        <Select
          className={s.selectFormat}
          onValueChange={(val) => setCurrentOption(val)}
          label={'Choose a question format'}
          selectOptions={selectOption}
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          {currentOption === "Text" &&
            <>
              <ControlInput name={'questionTxt'} control={control} label={'Question'}/>
              <ControlInput name={'answerTxt'} control={control} label={'Answer'}/>
            </>
          }
          {currentOption === 'Picture' && <>
            <div className={s.questionImg}>
              {selectedQuesImage ? (
                <img alt={'image'} className={s.image} src={selectedQuesImage}/>
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
                <Button onClick={handleButtonClick} type={'button'} name={'question'} variant={'secondary'}>
                  <IconImage/>
                  <Typography variant={'subtitle-2'}>Change Cover</Typography>
                </Button>
              </div>
            </div>

            <div className={s.answerImg}>
              {selectedAnsImage ? (
                <img alt={'image'} className={s.image} src={selectedAnsImage}/>
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
                <Button onClick={handleButtonClick} type={'button'} name={'answer'} variant={'secondary'}>
                  <IconImage/>
                  <Typography variant={'subtitle-2'}>Change Cover</Typography>
                </Button>
              </div>
            </div>

          </>}
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
  );
}
