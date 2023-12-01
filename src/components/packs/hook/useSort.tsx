import { useState } from 'react'

import { IconVectorDown } from '@/assets/icons/IconVectorDown'
import { IconVectorUp } from '@/assets/icons/IconVectorUp'

export const useSort = () => {
  const [sort, setSort] = useState('lastUpdate-asc')

  const iconVector = sort === 'lastUpdate-asc' ? <IconVectorDown /> : <IconVectorUp />
  const onVectorChange = () => {
    if (sort === 'lastUpdate-asc') {
      setSort('lastUpdate-desc')
    }
    if (sort === 'lastUpdate-desc') {
      setSort('lastUpdate-asc')
    }

    return sort
  }

  return { iconVector, onVectorChange }
}
