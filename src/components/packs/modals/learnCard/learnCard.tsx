import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { LearnPageData, radioOptions } from '@/assets/variable'
import { radioSchema } from '@/components/auth/validate/validate'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ControlRadioGroup } from '@/components/ui/controlled/controlRadioGroup'
import { Typography } from '@/components/ui/typography'
import { getRandomCardResponse, saveGrade, saveGradeResponse } from '@/services/decks'
import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'
import { z } from 'zod'

import s from './learnCard.module.scss'

const schema = z.object({
  radio: radioSchema,
})

type FormValues = z.infer<typeof schema>

type Props = {
  card: getRandomCardResponse | saveGradeResponse
  className: string
  handleGiveGrade: (payload: saveGrade) => void
  title: string
}

export const LearnCard = React.memo(({ card, className, handleGiveGrade, title }: Props) => {
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const { answer, buttonEnd, buttonNext, buttonShow, question, rateTitle, tryInfo } =
    LearnPageData.learnCard
  const onEndStudyClick = () => {
    navigate(-1)
  }

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
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
    const payload = {
      cardId: card.id,
      grade,
    }

    handleGiveGrade(payload)
    setShow(false)
    reset()
  }

  return (
    <Card className={clsx(s.LearnCardRoot, className)}>
      <Typography as={'h2'} className={s.LearnCardTitle} variant={'H2'}>
        {title}
      </Typography>
      <Typography as={'p'} className={s.LearnCardInfo} variant={'body-1'}>
        <b>{question}</b> {card.question}
      </Typography>
      {card.questionImg && (
        <div className={s.LearnCardBoxImg}>
          <img alt={'img'} className={s.LearnCardImg} src={card.questionImg} />
        </div>
      )}
      <Typography as={'p'} className={s.LearnCardTryInfo} variant={'body-2'}>
        {tryInfo} {card.shots}
      </Typography>
      {!show && (
        <Button fullWidth onClick={() => setShow(true)}>
          <Typography variant={'subtitle-2'}>{buttonShow}</Typography>
        </Button>
      )}
      {show && (
        <>
          <Typography as={'p'} className={s.LearnCardInfo} variant={'body-1'}>
            <b>{answer}</b> {card.answer}
          </Typography>
          {card.answerImg && (
            <div className={s.LearnCardBoxImg}>
              <img alt={'img'} className={s.LearnCardImg} src={card.answerImg} />
            </div>
          )}
          <Typography as={'h3'} className={s.LearnCardRateHeader} variant={'subtitle-1'}>
            {rateTitle}
          </Typography>
          <form className={s.LearnCardForm} onSubmit={handleSubmit(onSubmit)}>
            <ControlRadioGroup
              className={s.LearnCardRadioGroup}
              control={control}
              errorMessage={errors.radio?.message}
              name={'radio'}
              options={radioOptions}
            />
            <Button fullWidth>
              <Typography variant={'subtitle-2'}>{buttonNext}</Typography>
            </Button>
          </form>
        </>
      )}
      <Button
        className={s.LearnCardEndStudyButton}
        fullWidth
        onClick={onEndStudyClick}
        variant={'secondary'}
      >
        <Typography variant={'subtitle-2'}>{buttonEnd}</Typography>
      </Button>
    </Card>
  )
})
