import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { LearnPageData, errorText, optionsToast, toastInfo } from '@/assets/variable'
import { LearnCard } from '@/components/packs/modals/learnCard'
import { Loader } from '@/components/ui/loader'
import { Progress } from '@/components/ui/progress'
import {
  saveGrade,
  saveGradeResponse,
  useGetDeckByIdQuery,
  useGetRandomCardQuery,
  useSaveGradeMutation,
} from '@/services/decks'
import { ServerError } from '@/services/error.types'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

import s from './learn-page.module.scss'

export const LearnPage = React.memo(() => {
  const { id } = useParams()
  const { data: pack, isLoading: isLoadingPack } = useGetDeckByIdQuery({ id })
  const { data: randomCard, isLoading: isLoadingRandomCard } = useGetRandomCardQuery({ id })
  const [saveGrade, { isLoading: isLoadingSaveGrade }] = useSaveGradeMutation()
  const [card, setCard] = useState<null | saveGradeResponse>(null)
  const { giveGradeToast } = toastInfo
  const { title } = LearnPageData

  const handleGiveGrade = (payload: saveGrade) => {
    saveGrade(payload)
      .unwrap()
      .then((res: saveGradeResponse) => {
        setCard(res)
        toast.success(giveGradeToast, optionsToast)
      })
      .catch((e: ServerError & FetchBaseQueryError) => {
        toast.error(e?.data?.message || errorText, optionsToast)
      })
  }

  if (isLoadingSaveGrade) {
    return <Progress />
  } else if (isLoadingPack || isLoadingRandomCard) {
    return <Loader />
  } else if (pack && randomCard) {
    return (
      <LearnCard
        card={card || randomCard}
        className={s.LearnPageRoot}
        handleGiveGrade={handleGiveGrade}
        title={`${title} ${pack.name}`}
      />
    )
  }
})
