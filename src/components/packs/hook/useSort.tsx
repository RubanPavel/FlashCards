import { useState } from 'react'

import { IconVectorDown } from '@/assets/icons/IconVectorDown'
import { IconVectorUp } from '@/assets/icons/IconVectorUp'
import { orderByQuestion } from '@/services/cards/cards.slice'
import { orderByUpdated } from '@/services/decks/decks.slice'

export const useSort = (sortBy: 'question' | 'updated') => {
  const [sort, setSort] = useState<orderByQuestion | orderByUpdated>(`${sortBy}-asc`)

  const iconVector = sort === `${sortBy}-asc` ? <IconVectorDown /> : <IconVectorUp />
  const onVectorChange = (name: 'question' | 'updated') => {
    if (sort === `${name}-asc`) {
      setSort(`${name}-desc`)
    }
    if (sort === `${name}-desc`) {
      setSort(`${name}-asc`)
    }

    return sort
  }

  return { iconVector, onVectorChange, sort }
}
