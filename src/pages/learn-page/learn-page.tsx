import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { LearnCard } from '@/components/packs/modals/learnCard'
import { ModalsNew } from '@/components/ui/modals/modalsNew'
import { Typography } from '@/components/ui/typography'
import { useGetDeckByIdQuery, useGetDecksCardsQuery, useGetRandomCardQuery } from '@/services/decks'

import s from './learn-page.module.scss'

export const LearnPage = React.memo(() => {
  const [open, onClose] = useState(false)
  const { id } = useParams()
  const { data: packData } = useGetDeckByIdQuery({ id })
  const { data: cardsData } = useGetDecksCardsQuery({ id })
  const { data: randomCard } = useGetRandomCardQuery({ id })

  useEffect(() => {
    randomCard && onClose(true)

    return () => {
      randomCard && onClose(false)
    }
  }, [randomCard])

  const cardsWithoutRandomCard = cardsData?.items.filter(c => c.id !== randomCard?.id)

  return (
    <ModalsNew
      className={{ content: s.content, title: s.title }}
      onClose={onClose}
      onInteractOutside
      open={open}
      showCloseButton={false}
      title={<Typography variant={'large'}>Learn {packData?.name}</Typography>}
    >
      <LearnCard
        answerImg={randomCard?.answerImg}
        answerText={randomCard?.answer}
        cardId={randomCard?.id}
        cards={cardsWithoutRandomCard}
        onClose={onClose}
        questionImg={randomCard?.questionImg}
        questionText={randomCard?.question}
      />
    </ModalsNew>
  )
})
