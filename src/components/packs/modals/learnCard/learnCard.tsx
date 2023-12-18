import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'

import {radioOptions, radioSchema} from '@/components/auth/validate/validate'
import {Button} from '@/components/ui/button'
import {ControlRadioGroup} from '@/components/ui/controlled/controlRadioGroup'
import {Typography} from '@/components/ui/typography'
import {CardsResponseItems, useSaveGradeMutation} from '@/services/decks'
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'

import s from './learnCard.module.scss'

const schema = z.object({
  radio: radioSchema,
})

type FormValues = z.infer<typeof schema>

type Props = {
  answerText?: string
  cardId?: string
  cards?: CardsResponseItems[]
  onClose: (val: boolean) => void
  questionText?: string
}

export const LearnCard = React.memo(
  ({answerText, cardId, cards, onClose, questionText}: Props) => {
    const [show, setShow] = useState(false)
    const [index, setIndex] = useState(0)
    const [card, setCard] = useState({
      answerText,
      cardId,
      questionText,
    })
    const [saveGrade, {isLoading}] = useSaveGradeMutation()
    const navigate = useNavigate()
    const onEndStudyClick = () => {
      onClose(false)
      navigate(-1)
    }

    const {
      control,
      formState: {errors},
      handleSubmit,
    } = useForm<FormValues>({
      defaultValues: {
        radio: '',
      },
      mode: 'onBlur',
      reValidateMode: 'onChange',
      resolver: zodResolver(schema),
    })

    const onSubmit = (data: FormValues) => {
      const grade = radioOptions.indexOf(data.radio) + 1
      setShow(false)
      saveGrade({cardId: card.cardId, grade})
      if (!isLoading) {
        getCard()
      }
    }

    const getCard = () => {
      const currentCard = cards?.splice(index, 1)[0]

      if (currentCard) {
        setCard(prev => ({
          ...prev,
          answerText: currentCard?.answer,
          cardId: currentCard.id,
          questionText: currentCard?.question,
        }))
        setIndex(prev => prev + 1)
      } else {
        navigate(-1)
      }
    }

    return (
      <div>
        <Typography className={s.colorText} variant={'subtitle-1'}>
          Question:&nbsp;
        </Typography>
        <Typography className={s.colorText} variant={'body-1'}>
          {card.questionText}
        </Typography>
        <Typography as={'p'} className={s.TenTryText} variant={'body-2'}>
          Количество попыток ответа на вопрос: 10
        </Typography>
        {!show && (
          <Button fullWidth onClick={() => setShow(true)}>
            <Typography variant={'subtitle-2'}>Show Answer</Typography>
          </Button>
        )}
        {show && (
          <div>
            <Typography className={s.colorText} variant={'subtitle-1'}>
              Answer:&nbsp;
            </Typography>
            <Typography className={s.colorText} variant={'body-1'}>
              {card.answerText}
            </Typography>
            <Typography as={'p'} className={s.rateText} variant={'subtitle-1'}>
              Rate yourself:
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ControlRadioGroup
                className={s.radio}
                control={control}
                errorMessage={errors.radio?.message}
                name={'radio'}
                options={radioOptions}
              />
              <Button fullWidth>
                <Typography variant={'subtitle-2'}>Next Question</Typography>
              </Button>
            </form>
          </div>
        )}
        <Button className={s.endStudy} fullWidth onClick={onEndStudyClick} variant={'secondary'}>
          <Typography variant={'subtitle-2'}>End study session</Typography>
        </Button>
      </div>
    )
  }
)
