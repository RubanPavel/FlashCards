import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

import { LearnCard } from '@/components/packs/modals/learnCard'
import { ModalsNew } from '@/components/ui/modals/modalsNew.'
import { Typography } from '@/components/ui/typography'
import { useGetDeckByIdQuery, useGetDecksCardsQuery } from '@/services/decks'

import s from './learn-page.module.scss'

export const LearnPage = React.memo(() => {
  const [open, onClose] = useState(false)
  const { state } = useLocation()

  const { id } = useParams()
  const { data: packData } = useGetDeckByIdQuery({ id })
  const { data: cardsData } = useGetDecksCardsQuery({ id })

  useEffect(() => {
    state && onClose(true)

    return () => {
      state && onClose(false)
    }
  }, [])

  const randomCard = state && state.randomCard
  const cardsWithoutRandomCard = cardsData?.items.filter(c => c.id !== randomCard?.id)

  return (
    <ModalsNew
      className={{ content: s.content, title: s.title }}
      onClose={onClose}
      open={open}
      showCloseButton={false}
      title={<Typography variant={'large'}>Learn {packData?.name}</Typography>}
    >
      <LearnCard
        answerText={randomCard?.answer}
        cardId={randomCard?.id}
        cards={cardsWithoutRandomCard}
        onClose={onClose}
        questionText={randomCard?.question}
      />
    </ModalsNew>
  )
})
