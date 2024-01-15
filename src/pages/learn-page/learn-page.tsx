import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { LearnCard } from '@/components/packs/modals/learnCard'
import { ModalsBest } from '@/components/ui/modals/modalsBest'
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
    <ModalsBest
      className={{ content: s.content, title: s.title }}
      isModalOpen={open}
      setIsModalOpen={onClose}
      title={`Learn ${packData?.name}`}
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
    </ModalsBest>
  )
})
